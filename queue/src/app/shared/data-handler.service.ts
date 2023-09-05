import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  url = 'assets/testDataNew.json';

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
   return this.http.get(this.url)
  }

  encode(str: string) {
    if (typeof str === 'string') {
      let strArr = str.split('');
      let crypted = strArr.map(el => el.charCodeAt(0) * 0.1).join('-');
      return crypted
    }
    return typeof str
  }

  decode(str: string) {
    let result = str.split('-').map((val) => String.fromCharCode((val as unknown as number) / 0.1)).join('');
    result = this.firstCharLowerCase(result)
    return result
  }

  firstCharLowerCase(str: string) {
    let result = str.split(' ');
    return result.map(el => {
      return el[0].toUpperCase() + el.slice(1)
    }).join(' ')
  }
}

