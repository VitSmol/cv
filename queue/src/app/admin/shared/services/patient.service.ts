import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, shareReplay } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Oz, Patient, Types } from 'src/app/admin/shared/interfaces/phpInterface';
import { OzDAOArray } from 'src/app/dao/implements/OzDAOArray';
import { PatientDAOArray } from 'src/app/dao/implements/PatientsDAOArray';
import { TypesDAOArray } from 'src/app/dao/implements/TypesDAOArray';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  baseUrl = "http://localhost/php/";

  // patientsSubject = new BehaviorSubject<Patient[]>([]);
  // typeSubject = new Subject();

  constructor(
    private http: HttpClient
  ) { }

  private patientsDAO = new PatientDAOArray(this.http)
  private ozDAO = new OzDAOArray(this.http)
  private typesDAO = new TypesDAOArray(this.http)

  //* Рабочий метод DAO
  getPatients(): Observable<Patient[]> {
    return this.patientsDAO.getAll();
  }
  //* Обновление данных пациента в БД DAO
  updatePatient(patient: Patient) {
    return this.patientsDAO.update(patient);
  }

  //* Удаление пациента из БД DAO
  deletePatient(id: string) {
    return this.patientsDAO.delete(id);
  }

  //* Поиск списка организаций в БД DAO
  getOz(): Observable<Oz[]> {
    return this.ozDAO.getAll()
  }
/// Чисто тестовый метод
  testGetOz() {
    return this.ozDAO.getAllTest();
  }

  //* Поиск типа протезирования в БД DAO
  getTypes(): Observable<Types[]> {
    return this.typesDAO.getAll()
  }

  //* Добавление пациента в БД DAO
  createPatient(patient: Patient) {
    return this.patientsDAO.add(patient)
    // return this.http.post(this.baseUrl + 'insert.php', patient);
  }

  //? Методы для редактирования данных о пациенте
  getPatient(id: number) {
    return this.http.get<Patient>(environment.baseUrl + 'view.php?id=' + id);
  }

  getSQL(org: string) {
    return this.http.get<Patient[]>(environment.baseUrl + 'getPatientsByOrg.php?org=' + org)
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
