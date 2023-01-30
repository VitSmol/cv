import { Component, ElementRef, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import * as uuid from 'uuid';
import * as XLSX from 'xlsx';
import { ColumnsNames } from '../interfaces/interfaces';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass']
})
export class MainPageComponent {

  constructor() { }
  resultArray: any[] = [];
  csvRecords: any[] = [];
  header = true;
  fileName = 'excel.xlsx';
  ColumnsNames = ColumnsNames;
  //!
  ExcelData: any[] = [];

  headers: any[] = [
    ColumnsNames.number,
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
    // ColumnsNames.org,
  ]

  @ViewChild('fileImportInput') fileImportInput: any;


  compareArray(arr: any[]) {
    const result = arr.reduce((a, b) => {
      if (!a.find((v: { [x: string]: any; }) => v[ColumnsNames.number] === b[ColumnsNames.number] && v[ColumnsNames.fio] === b[ColumnsNames.fio])) {
        a.push(b)
      }
      return a;
    }, [])
    return result;
  }
  export() {
    const element = document.getElementById('my-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }
  readExcel(evt: any) {
    let file = evt.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (e) => {
      let workBook = XLSX.read(fileReader.result, { type: 'binary' });
      let sheetNames = workBook.SheetNames;
      const ws = workBook.Sheets[sheetNames[0]]

      for (let key in ws) {
        if (ws[key].w != ws[key].v) {
          const array = (ws[key].w).split('/')
          const date = new Date(+('20' + array[2]), +array[0] - 1, +array[1])
          ws[key].v = date
        }
      }
      this.ExcelData = XLSX.utils.sheet_to_json(ws)
      this.ExcelData.forEach((patient) => {
      })
      this.resultArray.push(this.ExcelData);
      this.resultArray = this.compareArray(this.resultArray.flat())
        .sort((a: { [x: string]: any; }, b: { [x: string]: any; }) => a[ColumnsNames.date] - b[ColumnsNames.date])
    }
  }
}
