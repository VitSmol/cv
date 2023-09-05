import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../shared/services/patient.service';
import { Oz, Patient, Types } from '../../shared/interfaces/phpInterface';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.sass']
})
export class DashboardPageComponent implements OnInit {

  patientsArr!: Patient[];
  tempArr!: Patient[];
  typesArr: Types[] =[]
  Oz!: Oz[]
  currentOrg!: string

  constructor(
    private service: PatientService
  ){}

  ngOnInit(): void {
    this.service.getPatients()
      .subscribe((data: Patient[]) => {
        this.patientsArr = data
        //! создаем временный массив
        this.tempArr = [...this.patientsArr]
      });
    this.service.getOz()
      .subscribe((data: Oz[]) => this.Oz = data);
    this.service.getTypes()
      .subscribe((data: Types[]) => this.typesArr = data);
  }

  private filterByOz (patients: Patient[], oz:string): Patient[] {
    if (this.currentOrg) {
      return patients.filter((p: Patient) => {
        return p.org === oz;
      })
    } else {
      return patients
    }
  }

  protected onSelectOz(e: string) {
    this.currentOrg = e
    //! Старый способ.
    //! При переключении организации каждый раз подгружал данные с сервера
    // this.service.getPatients().subscribe((data: Patient[]) => {
    //   this.patientsArr = this.filterByOz(data, this.currentOrg)
    // })
    //! Новый способ. При переключении организации фильтрует по временному массиву
    this.tempArr = this.filterByOz(this.patientsArr, this.currentOrg)
  }

  protected updPatient(patient: Patient ) {
    //* Отправляем изменения о пациенте на сервер
    this.service.updatePatient(patient).subscribe(() => {
      //! Старый способ. При редактировании отправлял изменения и загружал
      //! из БД измененный массив, работало с задержкой.
      // this.service.getPatients().subscribe((data: Patient[]) => {
      //   this.tempArr = this.filterByOz(data, this.currentOrg)
      // })
      //! Новый способ. отправляет изменения на сервер, но перерисовывает
      //! на основе локального массива
      const currentIndex = this.tempArr.findIndex(el => el.id === patient.id)
      this.tempArr[currentIndex] = patient
        this.tempArr = this.filterByOz(this.patientsArr, this.currentOrg)
    })
  }

  protected delPatient(patient: Patient) {
    //* Удаляем пациента
    this.service.deletePatient(patient.id).subscribe(()=> {
      //! Старый способ. При удалении отправлял изменения и загружал
      //! из БД измененный массив, работало с задержкой.
      // this.service.getPatients().subscribe((data: Patient[]) => {
      //   this.tempArr = this.filterByOz(data, this.currentOrg)
      // })
      //! Новый способ. отправляет изменения на сервер, но перерисовывает
      //! на основе локального массива
      const currentIndex = this.tempArr.findIndex(el => el.id === patient.id)
      this.tempArr.splice(currentIndex, 1)
      this.tempArr = this.filterByOz(this.tempArr, this.currentOrg)
    })
  }
}
