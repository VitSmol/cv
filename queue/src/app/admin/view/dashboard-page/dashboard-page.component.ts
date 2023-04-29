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
  selectedOz!: string

  constructor(
    public auth: AuthService,
    public service: PatientService
  ){}

  ngOnInit(): void {
    this.service.getPatients().subscribe((data: Patient[]) => this.patientsArr = data);
    this.service.getOz().subscribe((data: Oz[]) => this.Oz = data);
  }

  filterByOz (patients: Patient[], oz:string): Patient[] {
    if (this.selectedOz) {
      return patients.filter((p: Patient) => {
        return p.org === oz;
      })
    } else {
      return patients
    }
  }

  onSelectOz(e: string) {
    this.selectedOz = e
    this.service.getPatients().subscribe((data: Patient[]) => {
      this.patientsArr = this.filterByOz(data, this.selectedOz)
    })
  }

  updPatient(patient: Patient) {
    this.service.updatePatient(patient).subscribe(() => {
      this.service.getPatients().subscribe((data: Patient[]) => {
        this.patientsArr = this.filterByOz(data, this.selectedOz)
      })
    })
  }
  delPatient(patient: Patient) {
    this.service.deletePatient(patient.id).subscribe(()=> {
      this.service.getPatients().subscribe((data: Patient[]) => {
        this.patientsArr = this.filterByOz(data, this.selectedOz)
      })
    })
    console.log(patient);
  }
}
