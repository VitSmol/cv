import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../shared/services/patient.service';
import { Oz, Patient, Types } from '../../shared/interfaces/phpInterface';
import { concat, filter, from, fromEvent, map, merge, of, reduce, switchMap, tap, toArray, zip, zipAll, zipWith } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.sass']
})
export class DashboardPageComponent implements OnInit {

  public patientsArr: Patient[] = [];
  public tempArr: Patient[] = [];
  public typesArr: Types[] = []
  public Oz: Oz[] = []
  public currentOrg!: string | null

  private findableListnumber: string | null = null;
  private findableType: string | null = null
  private findableFIO: string | null = null

  constructor(
    private service: PatientService
  ) { }

  ngOnInit(): void {
    this.service.getPatients().pipe(
      switchMap((data: Patient[]) => from(data)),
      map((patient: Patient) => {
        return {
          ...patient,
          fullname: `${patient.lastname} ${patient.name} ${patient.fathername}`
        }
      }),
      toArray()
      ).subscribe((data: Patient[]) => {
        this.tempArr = [...this.patientsArr] = data;
        console.log(this.tempArr);

    });
    this.service.getOz().subscribe((data: Oz[]) => this.Oz = data);
    this.service.getTypes().subscribe((data: Types[]) => this.typesArr = data);
  }

  //! Фильтр отображаемых пациентов по категории
  protected onSelectOz(e: string | null) {
    this.currentOrg = e
    console.log(this.currentOrg);
    //! Новый способ. При переключении организации фильтрует по временному массиву
    this.tempArr = this.filterByOz(this.patientsArr)
    this.updatePatientsList()
  }

  //* Изменяем пациента
  protected updPatient(patient: Patient) {
    this.service.updatePatient(patient).subscribe(() => {
      this.repaint(patient, "update")
    })
  }

  //* Удаляем пациента
  protected delPatient(patient: Patient) {
    this.service.deletePatient(patient.id).subscribe(() => {
      this.repaint(patient, "delete")
    })
  }
  //* Добавление пациента
  protected addPatient(patient: Patient) {
    this.service.createPatient(patient).subscribe(() => {
      this.repaint(patient, "add")
      this.service.getPatients().subscribe(data => {
        patient.id = data[data.length - 1].id.toString()
        console.log(patient);
      })
    })
  }

  protected onFilterPatientsByListNumber(e: string | null) {
    this.findableListnumber = e;
    this.updatePatientsList()
  }

  protected onFilterPatientsByType(e: string | null) {
    this.findableType = e;
    this.updatePatientsList()
  }

  protected onFilterPatientsByFio(e: string | null) {
    this.findableFIO = e;
    this.updatePatientsList()
  }

  //` Методы для отображения и перерисовки контента на странице

  private repaint(patient: Patient, operation: "update" | "delete" | "add"): void {
    this.redraw(patient, this.tempArr, this.patientsArr, operation)
    this.tempArr = this.filterByOz(this.patientsArr)
    this.updatePatientsList()
  }

  private filterByOz(patients: Patient[]): Patient[] {
    return this.currentOrg ? patients.filter((p: Patient) => p.org === this.currentOrg) : patients;
  }

  //! Новый способ.отправляет изменения на сервер, но  после операции
  //! обновления/удаления перерисовывает таблицу на основе локального массива
  private redraw(patient: Patient, tempArr: Patient[], arr: Patient[], operation: "update" | "delete" | "add") {
    let tempArrInd = 0;
    let ind = 0;
    if (operation !== "add") {
      tempArrInd = tempArr.findIndex((el: Patient) => el.id === patient.id);
      ind = arr.findIndex((el: Patient) => el.id === patient.id);
    }
    if (operation === "update") {
      tempArr[tempArrInd] = arr[ind] = patient;
    } else if (operation === "delete") {
      tempArr.splice(tempArrInd, 1)
      arr.splice(ind, 1)
    } else if (operation === "add") {
      tempArr.push(patient);
      arr.push(patient)
    }
  }

  private updatePatientsList() {
    let searchArr = this.filterByOz(this.patientsArr)
    if (this.findableListnumber) {
      searchArr = searchArr.filter(patient => patient.listnumber?.toLowerCase().includes(this.findableListnumber?.toLowerCase() as string))
    }
    if (this.findableFIO) {
      searchArr = searchArr.filter(patient => {
        return patient.fullname?.toLowerCase().includes(this.findableFIO?.toLowerCase() as string)
      })
    }
    if (this.findableType !== null) {
      searchArr = searchArr.filter(patient => patient.type === this.findableType)
    }
    this.tempArr = [...searchArr]
  }
}
