import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Oz, Patient, Types } from 'src/app/admin/shared/phpInterface';

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

  getPatientsByOrg (org: string | undefined) {
    let arr = []
    this.getPatients().subscribe(data => {
      arr = data.filter(patient => patient.org === org);
      console.log(arr);

    })
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

  getTypes(): Observable<Types[]> {
    return this.http.get<Types[]>(this.baseUrl + 'getTypes/view.php')
  }
}
