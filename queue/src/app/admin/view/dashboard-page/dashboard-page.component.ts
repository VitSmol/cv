import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../shared/services/patient.service';
import { Oz, Patient, Types } from '../../shared/interfaces/phpInterface';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.sass']
})
export class DashboardPageComponent implements OnInit {

  public patientsArr!: Patient[];
  public tempArr!: Patient[];
  public typesArr: Types[] = []
  public Oz!: Oz[]
  public currentOrg!: string

  private findableListnumber: string | null = null;
  private findableType: string | null = null
  private findableFIO: string | null = null

  constructor(
    private service: PatientService
  ) { }

  ngOnInit(): void {
    this.service.getPatients()
      .subscribe((data: Patient[]) => {
        this.tempArr = [...this.patientsArr] = data;
      });
    this.service.getOz()
      .subscribe((data: Oz[]) => this.Oz = data);
    this.service.getTypes()
      .subscribe((data: Types[]) => this.typesArr = data);
  }

  //! Фильтр отображаемых пациентов по категории
  private filterByOz(patients: Patient[], oz: string): Patient[] {
    return this.currentOrg ? patients.filter((p: Patient) => p.org === oz) : patients;
  }

  protected onSelectOz(e: string) {
    this.currentOrg = e
    console.log(this.currentOrg);
    //! Новый способ. При переключении организации фильтрует по временному массиву
    this.tempArr = this.filterByOz(this.patientsArr, this.currentOrg)
    this.updatePatientsList()
  }

  //! Новый способ.отправляет изменения на сервер, но  после операции
  //! обновления/удаления перерисовывает таблицу на основе локального массива
  private redraw(patient: Patient, tempArr: Patient[], arr: Patient[], operation: "update" | "delete") {
    const tempArrInd = tempArr.findIndex((el: Patient) => el.id === patient.id);
    const ind = arr.findIndex((el: Patient) => el.id === patient.id);
    if (operation === "update") {
      tempArr[tempArrInd] = arr[ind] = patient;
    } else if (operation = "delete") {
      tempArr.splice(tempArrInd, 1)
      arr.splice(ind, 1)
    }
  }

  //* Изменяем пациента
  protected updPatient(patient: Patient) {
    this.service.updatePatient(patient).subscribe(() => {
      this.redraw(patient, this.tempArr, this.patientsArr, 'update')
      this.tempArr = this.filterByOz(this.patientsArr, this.currentOrg)
      this.updatePatientsList()
    })
  }

  //* Удаляем пациента
  protected delPatient(patient: Patient) {
    this.service.deletePatient(patient.id).subscribe(() => {
      this.redraw(patient, this.tempArr, this.patientsArr, 'delete')
      this.tempArr = this.filterByOz(this.patientsArr, this.currentOrg)
      this.updatePatientsList()
    })
  }

  onFilterPatientsByListNumber(e: string | null) {
    this.findableListnumber = e;
    this.updatePatientsList()
  }

  onFilterPatientsByType(e: string | null) {
    this.findableType = e;
    this.updatePatientsList()
  }

  onFilterPatientsByFio(e: string | null) {
    this.findableFIO = e;
    this.updatePatientsList()
  }

  private updatePatientsList() {
    let searchArr = this.filterByOz(this.patientsArr, this.currentOrg)
    if (this.findableListnumber) {
      searchArr = searchArr.filter(patient => patient.listnumber?.toLowerCase().includes(this.findableListnumber?.toLowerCase() as string))
    }
    if (this.findableFIO) {
      searchArr = searchArr.filter(patient => {
        return patient.name?.toLowerCase().includes(this.findableFIO?.toLowerCase() as string) ||
                patient.lastname?.toLowerCase().includes(this.findableFIO?.toLowerCase() as string) ||
                patient.fathername?.toLowerCase().includes(this.findableFIO?.toLowerCase() as string)
      })
    }
    if (this.findableType !== null) {
      searchArr = searchArr.filter(patient => patient.type === this.findableType)
    }
    this.tempArr = [...searchArr]
  }
}
