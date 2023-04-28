import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, shareReplay } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Oz, Patient, Types } from 'src/app/admin/shared/interfaces/phpInterface';
import { OzDAOArray } from 'src/app/dao/implements/OzDAOArray';
import { PatientDAOArray } from 'src/app/dao/implements/PatientsDAOArray';

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

  private patientsDAO = new PatientDAOArray(this.http)
  private ozDAO = new OzDAOArray(this.http)


  //* Рабочий метод DAO
  getPatients(): Observable<Patient[]> {
    return this.patientsDAO.getAll();
  }

  //* Поиск списка организаций в БД DAO
  getOz(): Observable<Oz[]> {
    return this.ozDAO.getAll()
  }

  //* Обновление данных пациента в БД DAO
  updatePatient(patient: Patient) {
    return this.patientsDAO.update(patient); //! метод из класса PatientDAOArray
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




//* Поиск типа протезирования в БД
  getTypes(): Observable<Types[]> {
    return this.http.get<Types[]>(this.baseUrl + 'getTypes/view.php')
  }


//! Старые не используемые методы
  // getPatientsByTypeRX(type: string) {
  //   this.http.get<Patient[]>(this.baseUrl + 'view.php').subscribe(data => {
  //     let arr = data.filter(patient => patient.type === type);
  //     this.patientsSubject.next(arr);
  //   })
  // }
  //Observable<Patient[]>
  // async getPatientsByOz(oz: String): Promise<any> {
  //   let arr: Patient[] = [];
  //   this.patientsDAO.getAll().subscribe(async (data: any) => {
  //     arr = await data.filter((p: Patient) => p.org === oz);
  //     // console.log(oz);
  //     return arr;
  //   })
  //   // console.log(arr);
  // }

  //* Рабочий метод DAO
  // getPatientsRX() {
  //   //! РЕШЕНИЕ ПРОБЛЕМЫ BEHAVIORSUBJECT
  //   this.patientsDAO.getAll().pipe(shareReplay(1))
  //     .subscribe((response: Patient[]) => this.patientsSubject.next(response));
  // }
//* Рабочий метод DAO
  // getPatientsByOrg(org: string | undefined) {
  //   return this.patientsDAO.getAll()
  //   // .subscribe(data => {
  //   //   this.patientsSubject.next(data.filter(patient => patient.org === org));
  //   // })
  // }
}
