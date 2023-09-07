import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ColumnsNames } from '../../../shared/interfaces/interfaces';
import { Patient, Types } from '../../../shared/interfaces/phpInterface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../dialog/confirm/confirm.component';
import { EditPageComponent } from '../dialog/edit-page/edit-page.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.sass']
})
export class ContentComponent implements OnInit {

  public ColumnsNames = ColumnsNames

  public displayedColumns = [
    'listnumber',
    'lastname',
    // 'address',
    'sex',
    'birthday',
    'date',
    // 'diag',
    // 'side',
    'isOperated',
    'operdate',
    'info',
    'type',
    'org',
    'operations']
  public dataSource!: MatTableDataSource<Patient>

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator
  @ViewChild(MatSort, { static: false }) sort!: MatSort

  public patientsArr!: Patient[]
  public types: Types[] = [];

  @Output() updatePatient = new EventEmitter<Patient>();
  @Output() deletePatient = new EventEmitter<Patient>();
  @Output() selectOz = new EventEmitter<string>();

  @Output() outListnumberFilterValue = new EventEmitter<string | null>();
  @Output() outTypeFilterValue = new EventEmitter<string | null>();

  searchFIO: string = '';
  listnumberFilter: string | null = '';
  selectedTypeFilter: string | null = '';

  //! Загружает всех пациентов
  @Input('patients') public set setPatients(patients: Patient[]) {
    this.patientsArr = patients;
    // this.fillTable();
    setTimeout(() => {
      // console.log(this.patientsArr);
      this.fillTable() //? без задержки не работает
    }, 1);
  }

  @Input('types') public set setTypes(types: Types[]) {
      this.types = types
      console.log(this.types);
    }

  constructor(
    private dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
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

  //! Окно подтверждения при удалении пациента из общего списка (иконка в таблице)
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



  onFilterByNumber() {
    this.outListnumberFilterValue.emit(this.listnumberFilter)
  }


  onFilterByType(e: any) {
    this.selectedTypeFilter = e
    this.outTypeFilterValue.emit(this.selectedTypeFilter)

  }

  onSelectOz(oz: string) {
    this.selectOz.emit(oz)
  }


    filterByFIO() {

    }
}
