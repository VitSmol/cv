import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ColumnsNames } from '../../../shared/interfaces/interfaces';
import { Patient } from '../../../shared/interfaces/phpInterface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EditPageComponent } from '../../dialog/edit-page/edit-page.component';
import { ConfirmComponent } from '../../dialog/confirm/confirm.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.sass']
})
export class ContentComponent implements OnInit {

  ColumnsNames = ColumnsNames

  public displayedColumns = ['listnumber', 'lastname', 'address', 'sex', 'birthday', 'date', 'diag', 'side', 'isOperated', 'operdate', 'info', 'type', 'org', 'operations']
  public dataSource!: MatTableDataSource<Patient>

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator
  @ViewChild(MatSort, { static: false }) sort!: MatSort

  public patientsArr!: Patient[]

  @Output() updatePatient = new EventEmitter<Patient>();
  @Output() deletePatient = new EventEmitter<Patient>();

  //! Загружает всех пациентов
  @Input('patients')
  public set setPatients(patients: Patient[]) {
    this.patientsArr = patients;
    setTimeout(() => {
      console.log(this.patientsArr);
      this.fillTable() //? без задержки не работает
    }, 1);
  }

  constructor(
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    console.log(this.patientsArr);
    this.dataSource = new MatTableDataSource();
    // this.fillTable();
  }

  private fillTable(): void {
    if (!this.dataSource) return
    this.dataSource.data = this.patientsArr;
    this.addTableObjects()
  }

  private addTableObjects(): void {
    this.dataSource.sort = this.sort; // компонент для сортировки данных (если необходимо)
    this.dataSource.paginator = this.paginator; // обновить компонент постраничности (кол-во записей, страниц)
  }

  // открытие диалогового окна редактирования
  protected openEditPatientDialog(patient: Patient): void {
    this.updatePatient.emit(patient);
    const dialogRef = this.dialog.open(EditPageComponent, {
      data: [patient, "Редактирование пациента"],
      autoFocus: false,
      width: '70vw',
      height: '85vh'
    });

    dialogRef.afterClosed().subscribe((result: {message: string, patient: Patient}) => {
      //* обработка результата Передаем измененного пациента через Output в dashboard
      if (!result) return

      if (result.message === 'update') {
        this.updatePatient.emit(result.patient);
        return
      }

      if (result.message === 'delete') {
        this.deletePatient.emit(result.patient)
        return
      }
    });
  }

  protected onDeleteConfirm(patient: Patient) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        dialogTitle: 'Изменение данных пользователя',
        message: `Вы действительно хотите удалить пациента ${patient.lastname} ${patient.name} ${patient.fathername}?`
      },
      autoFocus: false,
      width: '300px'
    })
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (!result) return
      if (result) {
        console.log(patient);
        this.deletePatient.emit(patient)
      }
    })
  }
  filter() {

  }
}
