import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/admin/shared/interfaces';
import { PatientService } from '../shared/patient.service';

@Component({
  selector: 'app-all-list',
  templateUrl: './all-list.component.html',
  styleUrls: ['./all-list.component.sass']
})
export class AllListComponent implements OnInit {
constructor( private patientService: PatientService){}
patients: Patient[] = []

  ngOnInit(): void {
    this.load()
  }
  load() {
    this.patientService.getPatients().subscribe((response: any) => {
      response.data.forEach((el: Patient) => {
        console.log(typeof el.operdate);
      })
      // console.log(response.data.date);
      this.patients = response.data;
    })
  }

  deletePatient(patient: Patient): void {
    console.log(patient);
    this.patientService.deletePatient(patient.id).subscribe(response => {
      this.load()
    })
  }

  logPatient(patient: Patient): void {
  console.log(patient);

  }
}
