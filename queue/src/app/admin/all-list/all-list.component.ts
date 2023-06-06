import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from 'src/app/admin/shared/interfaces';
import { PatientService } from '../shared/patient.service';

@Component({
  selector: 'app-all-list',
  templateUrl: './all-list.component.html',
  styleUrls: ['./all-list.component.sass']
})
export class AllListComponent implements OnInit {
  constructor(
    private patientService: PatientService,
    private router: Router
  ) { }
  patients: Patient[] = []

  ngOnInit(): void {
    this.load()
  }

  load() {
    this.patientService.getPatients().subscribe((response: any) => {
      response.data.forEach((el: Patient) => {
      })
      this.patients = response.data;
    })
  }

  deletePatient(patient: Patient): void {
    console.log(patient);
    this.patientService.deletePatient(patient.id).subscribe(response => {
      this.load()
    })
  }

  navigate(id: number | undefined) {
    this.router.navigate(['/admin', 'edit',id]);
  }
}
