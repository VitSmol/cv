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
    //! ДА СУКА ГОСПОДИ! ЭТО РЕШЕНИЕ
    this.service.getPatientsRX()
    this.service.patientsSubject.subscribe(data => this.patientsArr = data);
  }

  loadPatients() {
    this.service.patientsSubject.subscribe(patients => {
      this.patientsArr = patients;
    })
  }
}
