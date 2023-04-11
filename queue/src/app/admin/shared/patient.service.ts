import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from 'src/app/admin/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(
    private http: HttpClient
  ) { }
  baseUrl = "http://localhost/php/";

  getPatients() {
    return this.http.get<Patient[]>(this.baseUrl + 'view.php');
  }

  deletePatient(id: any) {
    return this.http.delete(this.baseUrl+'delete.php?id='+id)
  }
}
