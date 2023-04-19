import { Component, OnInit } from '@angular/core';
import { ColumnsNames } from '../../shared/interfaces/interfaces';
import { PatientService } from '../../shared/services/patient.service';
import { Patient, Types } from '../../shared/interfaces/phpInterface';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.sass']
})
export class ContentComponent implements OnInit {

  patientsArr: any
  ColumnsNames = ColumnsNames

  public displayedColumns = ['listnumber', 'name', 'address', 'sex', 'birthday', 'date', 'diag', 'side', 'isOperated', 'operdate', 'info', 'type', 'org']
  public dataSource!: MatTableDataSource<Patient>

  constructor(private service: PatientService) {

  }
  ngOnInit(): void {
    //! ДА СУКА ГОСПОДИ! ЭТО РЕШЕНИЕ
    this.service.getPatientsRX()
    this.service.patientsSubject.subscribe(data => {
      this.patientsArr = data
      this.refreshTable(data)
      this.dataSource = new MatTableDataSource(this.patientsArr);

    });

  }

  loadPatients() {
    this.service.patientsSubject.subscribe(patients => {
      this.patientsArr = patients;
    })
  }

  refreshTable(data: any) {
    // console.log(this.patientsArr);

    this.dataSource = data
    // console.log(this.dataSource);

  }
}
