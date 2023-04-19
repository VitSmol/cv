import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, shareReplay } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Oz, Patient, Types } from 'src/app/admin/shared/interfaces/phpInterface';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  baseUrl = "http://localhost/php/";

  patientsSubject = new BehaviorSubject<Patient[]>([]);
  typeSubject = new Subject();

  constructor(
    private http: HttpClient
  ) { }

  getPatientsRX() {
    //! РЕШЕНИЕ ПРОБЛЕМЫ BEHAVIORSUBJECT
    this.http.get<Patient[]>(this.baseUrl + "view.php").pipe(shareReplay(1))
      .subscribe((response: Patient[]) => this.patientsSubject.next(response));
  }

  getPatientsByOrgRX(org: string | undefined) {
    this.http.get<Patient[]>(this.baseUrl + 'view.php').subscribe(data => {
      this.patientsSubject.next(data.filter(patient => patient.org === org));
    })
  }

  //! старые методы используетя в компоненте all-list
  getPatients() {
    return this.http.get<Patient[]>(this.baseUrl + 'view.php');
  }

  //* Удаление пациента
  deletePatient(id: string) {
    return this.http.delete(this.baseUrl + 'delete.php?id=' + id)
  }

  //* Создание паиента
  createPatient(patient: Patient) {
    return this.http.post(this.baseUrl + 'insert.php', patient);
  }

  //* Методы для редактирования данных о пациенте
  //? Поиск пациента по ID
  getPatient(id: number) {
    return this.http.get<Patient>(this.baseUrl + 'view.php?id=' + id);
  }
  //? Обновление данных пациента
  updatePatient(patient: Patient) {
    return this.http.put(this.baseUrl + 'update.php', patient)
  }

  //* Поиск списка организаций в БД
  getOz(): Observable<Oz[]> {
    return this.http.get<Oz[]>(this.baseUrl + 'getOZ/view.php')
  }
//* Поиск типа протезирования в БД
  getTypes(): Observable<Types[]> {
    return this.http.get<Types[]>(this.baseUrl + 'getTypes/view.php')
  }



  // getPatientsByTypeRX(type: string) {
  //   this.http.get<Patient[]>(this.baseUrl + 'view.php').subscribe(data => {
  //     let arr = data.filter(patient => patient.type === type);
  //     this.patientsSubject.next(arr);
  //   })
  // }
}
