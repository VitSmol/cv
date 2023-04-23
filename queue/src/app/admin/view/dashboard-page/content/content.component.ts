import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ColumnsNames } from '../../../shared/interfaces/interfaces';
import { PatientService } from '../../../shared/services/patient.service';
import { Patient, Types } from '../../../shared/interfaces/phpInterface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.sass']
})
export class ContentComponent implements OnInit {

  // patientsArr: any
  ColumnsNames = ColumnsNames

  public displayedColumns = ['listnumber', 'lastname', 'address', 'sex', 'birthday', 'date', 'diag', 'side', 'isOperated', 'operdate', 'info', 'type', 'org']
  public dataSource!: MatTableDataSource<Patient>

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator
  @ViewChild(MatSort, { static: false }) sort!: MatSort

  public patientsArr!: Patient[]

  @Input('patientsArr')
  public set setPatients(patients: Patient[]) {
    this.patientsArr = patients;
    console.log(patients);

    setTimeout(() => {
      this.fillTable()
    }, 1);
  }
  // public patientsArr: Patient[] = [];

  constructor(
    private service: PatientService,
  ) {

  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    // this.getDataRecursive()
    this.fillTable();
    //! ДА СУКА ГОСПОДИ! ЭТО РЕШЕНИЕ
    // this.service.getPatientsRX()
    // this.service.patientsSubject.subscribe(data => {
    //   this.patientsArr = data
    //   this.refreshTable(data)
    //   this.dataSource = new MatTableDataSource(this.patientsArr);
    //   setTimeout(()=> {
    //     this.dataSource.paginator = this.paginator
    //     this.dataSource.sort = this.sort
    //   }, 500)
    // });
  }

  getData() {
    this.dataSource.data = this.patientsArr
    this.fillTable()

  }
  // getDataRecursive() {
  //   if (!this.patientsArr) {
  //     setTimeout(()=> {
  //       this.getDataRecursive()
  //     }, 1);
  //   } else {
  //     this.dataSource.data = this.patientsArr
  //     this.fillTable()
  //     console.log(this.patientsArr);
  //     return
  //   }
  // }

  fillTable() {
    if (!this.dataSource) return
    this.dataSource.data = this.patientsArr;
    this.addTableObjects()
  }

  public addTableObjects() {
    this.dataSource.sort = this.sort; // компонент для сортировки данных (если необходимо)
    this.dataSource.paginator = this.paginator; // обновить компонент постраничности (кол-во записей, страниц)
  }
}
