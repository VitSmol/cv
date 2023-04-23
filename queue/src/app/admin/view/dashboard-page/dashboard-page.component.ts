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
  selectedOz!: String

  constructor(
    public auth: AuthService,
    public service: PatientService
  ){}

  ngOnInit(): void {
    this.service.getPatients().subscribe((data: Patient[]) => this.patientsArr = data);
    this.service.getOz().subscribe((data: Oz[]) => this.Oz = data);
  }


  onSelectOz(e: String) {
    this.selectedOz = e
    this.service.getPatients().subscribe((data: Patient[]) => {
      this.patientsArr = data.filter((p: Patient) =>{
        return p.org === this.selectedOz
      });
    })
  }
}
