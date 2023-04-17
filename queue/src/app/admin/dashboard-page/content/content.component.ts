import { Component, OnInit } from '@angular/core';
import { ColumnsNames } from '../../shared/interfaces';
import { PatientService } from '../../shared/patient.service';
import { Patient, Types } from '../../shared/phpInterface';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.sass']
})
export class ContentComponent implements OnInit {

  patientsArr: Patient[] = [];
  ColumnsNames = ColumnsNames

  constructor(private service: PatientService) {

  }
  ngOnInit(): void {

  this.loadPatients()
  }


  loadPatients() {
    this.service.getPatients().subscribe(response => {
      this.patientsArr = response;
      console.log(this.patientsArr);

    })
  }
}
