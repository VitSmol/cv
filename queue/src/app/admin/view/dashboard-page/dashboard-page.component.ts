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

  testString = 'test2'

  constructor(
    public auth: AuthService,
    public service: PatientService
  ){}

  ngOnInit(): void {
    this.service.getPatients().subscribe((data: Patient[]) => this.patientsArr = data);
    this.service.getOz().subscribe((data: Oz[]) => this.Oz = data);
  }


}
