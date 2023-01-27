import { Component, ElementRef, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { Subject } from 'rxjs';
import * as uuid from 'uuid';
import * as XLSX from 'xlsx';

export enum ColumnsNames {
  number = '№ п.п.',
  fio = 'Ф.И.О.',
  address = 'Адрес места жительства (места пребывания), телефон',
  sex = 'Пол (м,ж)',
  birthday = 'Дата рождения (число, месяц, год)',
  date = 'Дата постановки на учет (чсило, месяц, год)',
  diag = 'Диагноз',
  side = 'сторона',
  group = 'Группа инвалидности',
  operDate = 'Дата операции',
  note = 'Дополнительная информация',
  org = 'Организация здравоохранения'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
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

  constructor(private ngxCsvParser: NgxCsvParser) { }
  ngOnInit(): void {

  }

  @ViewChild('fileImportInput') fileImportInput: any;

  fileChangeListener($event: any): void {
    const files = $event.srcElement.files;
    this.header =
      (this.header as unknown as string) === 'true' ||
      this.header === true;
    const id = uuid.v4();
    this.ngxCsvParser
      .parse(files[0], {
        header: this.header,
        delimiter: ';',
        encoding: 'utf8'
      })
      .pipe()
      .subscribe(
        (result: any[] | NgxCSVParserError) => {
          // console.log('Result', result);
          (this.csvRecords as any) = result;
          this.csvRecords.map(el => {
            el.id = uuid.v4().split('-')[4];
            el.date = new Date(+(el.date.split('.')[2]), +(el.date.split('.')[1]), +(el.date.split('.')[0]));
          })
          this.resultArray.push(this.csvRecords)
          this.resultArray = this.compareArray(this.resultArray.flat()).sort((a: { date: any; }, b: { date: any; }) => b.date - a.date)
          console.log(this.resultArray);
        },
        (error: NgxCSVParserError) => {
          console.log('Error', error);
        }
      );
  }

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
          // ws[key].v = ws[key].w
        }
      }
      // console.log(ws);

      this.ExcelData = XLSX.utils.sheet_to_json(ws)
      this.ExcelData.forEach((patient) => {

      })
      this.resultArray.push(this.ExcelData);

      this.resultArray = this.compareArray(this.resultArray.flat())
        .sort((a: { [x: string]: any; }, b: { [x: string]: any; }) => a[ColumnsNames.date] - b[ColumnsNames.date])
      // console.log(this.resultArray);

      // const result = this.ExcelData.map((patient) => {
      //   const date = ColumnsNames.date;
      //   patient[date] =  new Date(Number('20' + patient[date].split('/')[2]), Number(patient[date].split('/')[0]) - 1, Number(patient[date].split('/')[1]))
      //   return {
      //     ...patient,
      //   }
      // })
      // console.log(result);

    }
  }

}
