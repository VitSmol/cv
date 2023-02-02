import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import * as XLSX from 'xlsx';
import { AuthService } from '../auth.service';
import { DataHandlerService } from '../data-handler.service';
import { ColumnsNames } from '../interfaces/interfaces';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass']
})
export class MainPageComponent implements OnInit {

  constructor(
    private auth: AuthService,
    public handler: DataHandlerService
  ) { }

  ngOnInit(): void {
    console.log(
      // users.includes() //! delete it
    );

  }

  resultArray: any[] = [];
  csvRecords: any[] = [];
  header = true;
  fileName = 'excel.xlsx';
  ColumnsNames = ColumnsNames;
  //!
  ExcelData: any[] = [];

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
          if (sheetNames[ind] === `Калинковичи`) {
            patient.org = `ГОКБ`
          } else {
            patient.org = sheetNames[ind]
          }
          if (patient[ColumnsNames.operDate]) {
            console.log(patient);
          }
          patient.isOperated = false
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
}
