import { Component, OnInit } from '@angular/core';
import { ColumnsNames } from '../../shared/interfaces/interfaces';
import { PatientService } from '../../shared/services/patient.service';
import { Patient, Types } from '../../shared/interfaces/phpInterface';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.sass']
})
export class ContentComponent implements OnInit {

  patientsArr: any
  ColumnsNames = ColumnsNames

  constructor(private service: PatientService) {

  }
  ngOnInit(): void {
    this.loadPatients()
  }

  loadPatients() {
    this.service.patientsSubject.subscribe(patients => {
      console.log(patients);
      this.patientsArr = patients;
    })
  }
}
