import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/admin/shared/services/auth.service';
import { PatientService } from '../../shared/services/patient.service';
import { Oz, Patient } from '../../shared/interfaces/phpInterface';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.sass']
})
export class DashboardPageComponent implements OnInit {

  patientsArr!: Patient[];
  Oz!: Oz[]
  currentOrg!: string

  constructor(
    public auth: AuthService,
    public service: PatientService
  ){}

  ngOnInit(): void {
    this.service.getPatients()
      .subscribe((data: Patient[]) => this.patientsArr = data);
    this.service.getOz()
      .subscribe((data: Oz[]) => this.Oz = data);
  }

  filterByOz (patients: Patient[], oz:string): Patient[] {
    if (this.currentOrg) {
      return patients.filter((p: Patient) => {
        return p.org === oz;
      })
    } else {
      return patients
    }
  }

  onSelectOz(e: string) {
    this.currentOrg = e
    this.service.getPatients().subscribe((data: Patient[]) => {
      this.patientsArr = this.filterByOz(data, this.currentOrg)
    })
  }

  updPatient(patient: Patient) {
    this.service.updatePatient(patient).subscribe(() => {
      this.service.getPatients().subscribe((data: Patient[]) => {
        this.patientsArr = this.filterByOz(data, this.currentOrg)
      })
    })
  }

  delPatient(patient: Patient) {
    this.service.deletePatient(patient.id).subscribe(()=> {
      this.service.getPatients().subscribe((data: Patient[]) => {
        this.patientsArr = this.filterByOz(data, this.currentOrg)
      })
    })
    console.log(patient);
  }
}
