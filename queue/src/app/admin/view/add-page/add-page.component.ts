import { Component, ViewChild } from '@angular/core';
import exportFromJSON from 'export-from-json';
import { AuthService } from 'src/app/admin/shared/services/auth.service';
import { DataHandlerService } from 'src/app/shared/data-handler.service';
import { ColumnsNames, FullName, ProstheticsType } from 'src/app/admin/shared/interfaces/interfaces';
import * as XLSX from 'xlsx';
import { usersInfo } from '../../shared/data';
import { Oz, Patient } from '../../shared/interfaces/phpInterface';
import { PatientService } from '../../shared/services/patient.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.sass']
})

export class AddPageComponent {
  constructor(
    private auth: AuthService,
    public handler: DataHandlerService,
    public service: PatientService
  ) { }

  oz!: Oz[]
  readyArray!: any[]

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
    ColumnsNames.type,
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

  //! Фильтрация дубликатов
  compareArray(arr: any[]) {
    const result = arr.reduce((a, b) => {
      if (!a.find((v: { [x: string]: any; }) => v[ColumnsNames.number] === b[ColumnsNames.number] && v[ColumnsNames.fio] === b[ColumnsNames.fio] && v[ColumnsNames.date] === b[ColumnsNames.date])) {
        a.push(b)
      }
      return a;
    }, [])
    return result;
  }

  exportToXLSX() {
    const element = document.getElementById('my-table');
    if (!element) {
      return
    }
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }

  //! Подготавливаем массив для экспорта в JSON / XLSX
  transformArray(arr: any[]) {
    const res: any[] = [];
    arr.forEach((el) => {
      let nameFatherName = el[ColumnsNames.fio]
      if (nameFatherName) {
        if (nameFatherName.trim().split(' ').length != 3) {
          console.log(el);
        }
        nameFatherName = nameFatherName.trim().split(' ')
        nameFatherName.forEach((item: any, ind: string | number) => {
          if (item === ' ') {
            delete nameFatherName[ind]
          }
        } )
        nameFatherName = nameFatherName[1] + ' ' + nameFatherName[2]
      }
      const name = this.handler.encode(nameFatherName)

      const resEl = {
        number: `${el[ColumnsNames.number]}`,
        fio: name,
        type: el.type,
        org: el.org,
        orgFullInfo: usersInfo.find(user => user.shortName.toLowerCase() === el.org),
        org2: el.org2,
        isOperated: el.isOperated,
        date: new Date(el[ColumnsNames.date]) //.setDate(el[ColumnsNames.date].getDate() + 1),
      }
      if (resEl.fio == undefined) {
        console.log(resEl);
      }
      res.push(resEl)
   })
   return res;
  }

  exportToJson() {
    this.arrayForQueue = this.transformArray(this.resultArray)
    exportFromJSON({data: this.arrayForQueue, fileName: 'testData', exportType: 'json'})
  }

//! считываем данные из Excel табличек.
//! сортируем по дате постановки на учет
//! если имя листа - Речица разбиваем фио
//! и копируем номер в графу №п.п.
//! добавляем поле тазобедренные/коленный сустав
//!  реализовать калинковичи (добавить поле org2)
  readExcel(e: any) {
    let file = e.target.files[0]; //! обрабатываемый Excel файл
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (e) => {
      let workBook = XLSX.read(fileReader.result, { type: 'binary' });
      let sheetNames = workBook.SheetNames; //! имена листов

      sheetNames.forEach((sheet, ind) => {
        const ws: XLSX.WorkSheet = workBook.Sheets[sheet]; //! лист Excel
        for (let key in ws) {
          let dateArray  = ws[key].w;
          console.log(dateArray);

          try {
            if(dateArray.match(/\d{1,2}\.\d{1,2}\.\d{1,4}/g) && !key.includes('J') && !key.includes('K') && !key.includes('C')) {
              dateArray = dateArray.split('.');
              const date = new Date(+(dateArray[2]), +dateArray[1] - 1, +dateArray[0])
              ws[key].v = date
            } else if (dateArray.match(/\d{1,2}\/\d{1,2}\/\d{1,4}/g)) {
              dateArray = dateArray.split('/');
              if (+dateArray[2] < 26 && +dateArray[2] > 16) {
                dateArray[2] = "20" + dateArray[2];
              } else {
                dateArray[2] = "19" + dateArray[2];
              }
              const date = new Date(+dateArray[2], +dateArray[0] - 1, +dateArray[1]);
              ws[key].v = date
            }
          } catch (error) {
            continue
          }
        }
        this.ExcelData = XLSX.utils.sheet_to_json(ws);

        this.ExcelData.forEach((patient) => {

            patient.info = patient[ColumnsNames.note]
            patient.org = sheetNames[ind].toLowerCase()

            if (sheetNames[ind] === 'Речица') {
              patient[ColumnsNames.number] = patient[ColumnsNames.fio].split(' ')[3]
            }
            if (sheetNames[ind].match(/Кал/g)) {
              patient.org = 'калинковичи'
              patient.org2 = FullName.gokb
            }
          if (file.name.split('.')[0].toLowerCase() === 'тэкс') {
            patient.type = ProstheticsType.teks.toLowerCase()
          }
          if (file.name.split('.')[0].toLowerCase() === 'тэтс') {
            patient.type = ProstheticsType.tets.toLowerCase()
          }
          if (!!patient[ColumnsNames.operDate]) {
            patient.isOperated = true
          } else {
            patient.isOperated = false
          }
          patient[ColumnsNames.operDate] = patient[ColumnsNames.operDate]

        })
        this.resultArray.push(this.ExcelData);
        this.resultArray = this.compareArray(this.resultArray.flat())
          .sort((a: { [x: string]: any; }, b: { [x: string]: any; }) => a[ColumnsNames.date] - b[ColumnsNames.date])
      })
    }
  }

  showResultArray() {
    console.log(this.resultArray);
  }

  deleteOper() {
    this.resultArray = this.resultArray.filter(el => !el.isOperated);
  }

  deleteDie() {
    this.resultArray = this.resultArray.filter(el => {
      console.log(el.note);
    })
  }

  async refactorArray(arr: any) {
    this.service.getOz().subscribe( async (response) => {
        this.oz = await response;
        console.log(this.oz);

    this.readyArray = await arr.reduce((acc: any, el: any): any => {
      const patientOrg = el.org;
      const currentOZ = this.oz.find(oz => oz.orgshortname.toLocaleLowerCase() === patientOrg.toLocaleLowerCase());

      //! обработка даты постановки на учет
      let date = new Date(el[ColumnsNames.date])
      date.setDate(date.getDate() + 1);

      let birthday;
      try {
        if (typeof el[ColumnsNames.birthday] === 'number') {
          birthday = el[ColumnsNames.birthday]
        } else if (typeof el[ColumnsNames.birthday] === 'object') {
          birthday = el[ColumnsNames.birthday].getFullYear()
        } else {
          birthday = 'Неизвестно'
        }
      } catch (error) {
        console.log(el);

      }

      let sex;
      if (!el[ColumnsNames.sex]) {
        sex = ''
      } else {
        sex = el[ColumnsNames.sex][0]
      }

      let address; //.split(' ').flat(Infinity).join(' ')
      if (!el[ColumnsNames.address]) {
        address = ''
      } else {
        address = el[ColumnsNames.address].trim().split(' ').flat(Infinity).join(' ')
      }

      const fio = el[ColumnsNames.fio].trim().split(' ').flat(Infinity)
      if (fio.length !== 3) {
        console.log(el);
      }

      let isOperated;
      if (!!el.isOperated) {
        isOperated = 1
      } else {
        isOperated = 0
      }
      acc.push({
        listnumber: el[ColumnsNames.number],
        address: address,
        birthday: birthday,
        date: date,
        sex: sex,
        diag: el[ColumnsNames.diag],
        side: el[ColumnsNames.side],
        invalidgroup: el[ColumnsNames.group],
        operdate: el[ColumnsNames.operDate],
        info: el.info,
        isOperated: isOperated,
        type: el.type[0].toUpperCase() + el.type.slice(1),
        lastname: fio[0],
        name: fio[1],
        fathername: fio[2],
        org: currentOZ?.orgname
      })
      return acc;
    }, [])
    console.log(this.readyArray);

  })
  }
  upload() {
    console.log(this.readyArray);
    this.readyArray.forEach((el: Patient) => {
        this.service.createPatient(el).subscribe((data: any) => {
          if (data.message === "required fields cannot be empty") {
            console.log(el);
          }
        })
      // console.log(`create`);
    })
  }
}
