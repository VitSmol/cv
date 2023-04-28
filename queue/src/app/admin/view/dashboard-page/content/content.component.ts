import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ColumnsNames } from '../../../shared/interfaces/interfaces';
import { PatientService } from '../../../shared/services/patient.service';
import { Patient, Types } from '../../../shared/interfaces/phpInterface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EditPageComponent } from '../../dialog/edit-page/edit-page.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.sass']
})
export class ContentComponent implements OnInit {

  ColumnsNames = ColumnsNames

  public displayedColumns = ['listnumber', 'lastname', 'address', 'sex', 'birthday', 'date', 'diag', 'side', 'isOperated', 'operdate', 'info', 'type', 'org']
  public dataSource!: MatTableDataSource<Patient>

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator
  @ViewChild(MatSort, { static: false }) sort!: MatSort

  public patientsArr!: Patient[]

  @Output() updatePatient = new EventEmitter<Patient>();

  @Input('patientsArr')
  public set setPatients(patients: Patient[]) {
    this.patientsArr = patients;
    setTimeout(() => {
      this.fillTable() //? без задержки не работает
    }, 1);
  }

  constructor(
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fillTable();
  }

  fillTable(): void {
    if (!this.dataSource) return
    this.dataSource.data = this.patientsArr;
    this.addTableObjects()
  }

  public addTableObjects(): void {
    this.dataSource.sort = this.sort; // компонент для сортировки данных (если необходимо)
    this.dataSource.paginator = this.paginator; // обновить компонент постраничности (кол-во записей, страниц)
  }

  // открытие диалогового окна
  openEditPatientDialog(patient: Patient): void {
    this.updatePatient.emit(patient);
    const dialogRef = this.dialog.open(EditPageComponent, {
      data: [patient, "Редактирование пациента"],
      autoFocus: false,
      width: '70vw',
      height: '85vh'
    });

    dialogRef.afterClosed().subscribe((result: Patient) => {
      //* обработка результата Передаем измененного пациента через Output в dashboard
      if (result as Patient) {
        this.updatePatient.emit(result);
        return
      }
    });
  }
}
