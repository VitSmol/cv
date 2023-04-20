import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ColumnsNames } from '../../shared/interfaces/interfaces';
import { PatientService } from '../../shared/services/patient.service';
import { Patient, Types } from '../../shared/interfaces/phpInterface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.sass']
})
export class ContentComponent implements OnInit, AfterViewInit {

  patientsArr: any
  ColumnsNames = ColumnsNames

  public displayedColumns = ['listnumber', 'name', 'address', 'sex', 'birthday', 'date', 'diag', 'side', 'isOperated', 'operdate', 'info', 'type', 'org']
  public dataSource!: MatTableDataSource<Patient>

  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(private service: PatientService) {

  }
  ngAfterViewInit(): void {

    console.log(this.dataSource);
  }

  ngOnInit(): void {
    //! ДА СУКА ГОСПОДИ! ЭТО РЕШЕНИЕ
    this.service.getPatientsRX()
    this.service.patientsSubject.subscribe(data => {
      this.patientsArr = data
      this.refreshTable(data)
      this.dataSource = new MatTableDataSource(this.patientsArr);
      this.dataSource.paginator = this.paginator
    });

  }

  refreshTable(data: any) {
    this.dataSource = data
  }
}
