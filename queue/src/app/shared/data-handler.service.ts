import { Injectable } from '@angular/core';
import { ColumnsNames } from './interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  constructor() { }

  getData(arr: any[]) {
    const resultArray: any[] = [];
    arr.forEach((patient) => {
      const handlePatient = {
        number: patient[ColumnsNames.number],
        fio: patient[ColumnsNames.fio],
        address: patient[ColumnsNames.address],
        sex: patient[ColumnsNames.sex],
        birthday: patient[ColumnsNames.birthday],
        date: patient[ColumnsNames.date],
        diag: patient[ColumnsNames.diag],
        side: patient[ColumnsNames.side],
        operDate: patient[ColumnsNames.operDate],
        note: patient[ColumnsNames.note],
        org: ''
      }
    })
  }
}
