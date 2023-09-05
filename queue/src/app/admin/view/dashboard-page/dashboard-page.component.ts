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
  typesArr: Types[] = []
  Oz!: Oz[]
  currentOrg!: string

  constructor(
    private service: PatientService
  ) { }

  ngOnInit(): void {
    this.service.getPatients()
      .subscribe((data: Patient[]) => {
        this.patientsArr = data;
        //! создаем временный массив
        this.tempArr = [...this.patientsArr];
      });
    this.service.getOz()
      .subscribe((data: Oz[]) => this.Oz = data);
    this.service.getTypes()
      .subscribe((data: Types[]) => this.typesArr = data);
  }

  private filterByOz(patients: Patient[], oz: string): Patient[] {
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

  private redraw(patient: Patient, tempArr: Patient[], arr: Patient[], operation: "update" | "delete"){
    const tempArrInd = tempArr.findIndex((el: Patient) => el.id === patient.id);
    const ind = arr.findIndex((el: Patient) => el.id === patient.id);
    if (operation === "update") {
      tempArr[tempArrInd] = patient;
      arr[ind] = patient
    } else if (operation = "delete") {
      tempArr.splice(tempArrInd, 1)
      arr.splice(ind, 1)
    }
    this.tempArr = this.filterByOz(this.tempArr, this.currentOrg)
  }

  //! Новый способ.отправляет изменения на сервер, но  после операции
  //! обновления/удаления перерисовывает таблицу на основе локального массива
  //* Изменяем пациента
  protected updPatient(patient: Patient) {
    this.service.updatePatient(patient).subscribe(() => {
      //! Старый способ. При редактировании отправлял изменения и загружал
      //! из БД измененный массив, работало с задержкой.
      // this.service.getPatients().subscribe((data: Patient[]) => {
      //   this.tempArr = this.filterByOz(data, this.currentOrg)
      // })
      this.redraw(patient, this.tempArr, this.patientsArr, 'update')
    })
  }

  //* Удаляем пациента
  protected delPatient(patient: Patient) {
    this.service.deletePatient(patient.id).subscribe(() => {
      //! Старый способ. При удалении отправлял изменения и загружал
      //! из БД измененный массив, работало с задержкой.
      // this.service.getPatients().subscribe((data: Patient[]) => {
      //   this.tempArr = this.filterByOz(data, this.currentOrg)
      // })
      this.redraw(patient, this.tempArr, this.patientsArr, 'delete')
    })
  }
}
