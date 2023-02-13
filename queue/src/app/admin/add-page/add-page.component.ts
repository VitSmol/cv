import { Component, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import exportFromJSON from 'export-from-json';
import { AuthService } from 'src/app/shared/auth.service';
import { DataHandlerService } from 'src/app/shared/data-handler.service';
import { ColumnsNames, FullName, ProstheticsType } from 'src/app/shared/interfaces/interfaces';
import * as XLSX from 'xlsx';
import { usersInfo } from '../data/data';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.sass']
})
export class AddPageComponent {
  constructor(
    private auth: AuthService,
    public handler: DataHandlerService,
  ) { }

  resultArray: any[] = [];
  csvRecords: any[] = [];
  header = true;
  fileName = 'excel.xlsx';
  ColumnsNames = ColumnsNames;
  ExcelData: any[] = [];
  arrayForQueue: any[] = [];

  headers: ColumnsNames[] = [
    ColumnsNames.number,
    ColumnsNames.org,
    ColumnsNames.fio,
    ColumnsNames.address,
    ColumnsNames.sex,
    ColumnsNames.birthday,
    ColumnsNames.date,
    ColumnsNames.diag,
    ColumnsNames.side,
    ColumnsNames.group,
    ColumnsNames.operDate,
    ColumnsNames.note,
  ]


  @ViewChild('fileImportInput') fileImportInput: any;

  compareArray(arr: any[]) {
    const result = arr.reduce((a, b) => {
      if (!a.find((v: { [x: string]: any; }) => v[ColumnsNames.number] === b[ColumnsNames.number] && v[ColumnsNames.fio] === b[ColumnsNames.fio] && v[ColumnsNames.date] === b[ColumnsNames.date])) {
        a.push(b)
      }
      return a;
    }, [])
    return result;
  }

  export() {
    const element = document.getElementById('my-table');
    if (!element) {
      return
    }
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }

  transformArray(arr: any[]) {
    const res: any[] = [];
    arr.forEach((el) => {
      // const orgShort =
      let nameFatherName = el[ColumnsNames.fio]
      if (nameFatherName) {
        nameFatherName = nameFatherName.split(' ')[1] + ' ' + nameFatherName.split(' ')[2]
      }

      const resEl = {
        number: el[ColumnsNames.number],
        fio: nameFatherName,
        type: el.type,
        org: el.org,
        orgFullInfo: usersInfo.find(user => user.shortName.toLowerCase() === el.org),
        org2: el.org2,
      }
      // if (el.org === "калинковичи") {
      //   console.log(el);
      //   el.orgFullInfo.fullName = "Гомельская областная клиническая больница"
      // }
      res.push(resEl)
   })
   return res;
  }
  exportToJson() {
    this.arrayForQueue = this.transformArray(this.resultArray)
    exportFromJSON({data: this.arrayForQueue, fileName: 'testData', exportType: 'json'})
  }

//! считываем данные из Excel табличкек.
//! сортируем по дате постановки на учет
//! если имя листа - Речица разбиваем фио
//! и копируем номер в графу №п.п.
//! добавляем поле тазобедренные/коленный сустав
//! TODO: реализовать калинковичи (добавить поле org2)
  readExcel(e: any) {
    let file = e.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (e) => {
      let workBook = XLSX.read(fileReader.result, { type: 'binary' });
      let sheetNames = workBook.SheetNames;

      sheetNames.forEach((sheet, ind) => {
        const ws = workBook.Sheets[sheet]
        for (let key in ws) {
          let dateArray  = ws[key].w
          try {
            if(dateArray.match(/\d{1,2}\.\d{1,2}\.\d{1,4}/g)) {
              dateArray = dateArray.split('.');
              const date = new Date(+(dateArray[2]), +dateArray[1] - 1, +dateArray[0])
              ws[key].v = date
            }
          } catch (error) {
            continue
          }
        }
        this.ExcelData = XLSX.utils.sheet_to_json(ws)
        this.ExcelData.forEach((patient) => {
          //TODO
            if (sheetNames[ind] === 'Речица') {
              patient[ColumnsNames.number] = patient[ColumnsNames.fio].split(' ')[3]
            }
            if (sheetNames[ind].match(/Кал/g)) {
              console.log('Калинковичи');
              patient.org = 'калинковичи'
              patient.org2 = FullName.gokb
            }
            patient.org = sheetNames[ind].toLowerCase()
          // }
          if (file.name.split('.')[0].toLowerCase() === 'тэкс') {
            patient.type = ProstheticsType.teks.toLowerCase()
          }
          if (file.name.split('.')[0].toLowerCase() === 'тэтс') {
            patient.type = ProstheticsType.tets.toLowerCase()
          }
          patient.isOperated = false
        })
        this.resultArray.push(this.ExcelData);
        this.resultArray = this.compareArray(this.resultArray.flat())
          .sort((a: { [x: string]: any; }, b: { [x: string]: any; }) => a[ColumnsNames.date] - b[ColumnsNames.date])
      })
    }
    console.log(this.resultArray);
  }

  showResultArray() {
    // console.log(this.resultArray);
    console.log(this.resultArray);
    // console.log(this.resultArray);

  }

}
