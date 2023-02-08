import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ColumnsNames } from './interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  url = 'assets/testData.json';
  constructor(
    private http: HttpClient
  ) { }

  getAll() {
   return this.http.get(this.url)
  }
}
