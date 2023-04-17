import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Oz, Patient } from 'src/app/admin/shared/phpInterface';

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

  getPatient(id: number) {
    return this.http.get<Patient[]>(this.baseUrl + 'view.php?id=' + id);
  }

  deletePatient(id: any) {
    return this.http.delete(this.baseUrl+'delete.php?id='+id)
  }

  createPatient(patient: Patient) {
    console.log(patient);
    return this.http.post(this.baseUrl+'insert.php', patient);
  }

  updatePatient(patient: Patient) {
    return this.http.put(this.baseUrl+'update.php', patient)
  }

  getOz(): Observable<Oz[]> {
    return this.http.get<Oz[]>(this.baseUrl + 'getOZ/view.php')
  }
}
