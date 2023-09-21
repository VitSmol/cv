import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ColumnsNames } from '../../../shared/interfaces/interfaces';
import { Patient, Types } from '../../../shared/interfaces/phpInterface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../dialog/confirm/confirm.component';
import { EditPageComponent } from '../dialog/edit-page/edit-page.component';
import { fromEvent } from 'rxjs';

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
  public patientsArr!: Patient[]
  public types: Types[] = [];

  public listnumberFilter: string | null = '';
  public fioFilter: string = '';
  public selectedTypeFilter: string | null = null;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator
  @ViewChild(MatSort, { static: false }) sort!: MatSort

  @Output() updatePatient = new EventEmitter<Patient>();
  @Output() deletePatient = new EventEmitter<Patient>();
  @Output() selectOz = new EventEmitter<string | null>();
  @Output() outListnumberFilterValue = new EventEmitter<string | null>();
  @Output() outFioFilterValue = new EventEmitter<string | null>();
  @Output() outTypeFilterValue = new EventEmitter<string | null>();
  @Output() addNewPatient = new EventEmitter<Patient>();

  @Input() selectedOrg: string | null = null;

  //! Загружает всех пациентов
  @Input('patients') public set setPatients(patients: Patient[]) {
    this.patientsArr = patients;
    setTimeout(() => {
      this.fillTable() //? без задержки не работает
    }, 1);
  }

  @Input('types') public set setTypes(types: Types[]) {
    this.types = types
  }

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    // fromEvent(this, 'mousemove').subscribe(ev => {
    //   console.log(ev);

    // })
  }

  private fillTable(): void {
    if (!this.dataSource) return
    this.dataSource.data = this.patientsArr;
    this.dataSource.sort = this.sort; //* компонент для сортировки данных (если необходимо)
    this.dataSource.paginator = this.paginator; //* обновить компонент постраничности (кол-во записей, страниц)
  }

  //` открытие диалогового окна редактирования
  protected openPatientDialog(patient: Patient | null): void {
    const dialogRef = this.dialog.open(EditPageComponent, {
      data: patient ? [patient, "Редактирование данных о пациентe", "edit"] :
      [
        {
          // id: '',
          name: '',
          lastname: '',
          listnumber: '',
          fathername: '',
          date: new Date(),
          birthday: '',
          address: '',
          diag: '',
          operdate: '',
          info: '',
          type: this.selectedTypeFilter ? this.selectedTypeFilter : '',
          org: this.selectedOrg ? this.selectedOrg : '',
          sex: '',
          isOperated: '0',
          side: '',
          invalidgroup: '',
        },
        'Добавление нового пациента',
        'add'
      ],
      autoFocus: false,
      width: '70vw',
      height: '85vh'
    });
    dialogRef.afterClosed().subscribe((result: { message: string, patient: Patient }) => {
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
      if (result.message === 'add') {
        console.log(result.patient);

        this.addNewPatient.emit(result.patient)
        return
      }
    });
  }
  //` Окно подтверждения при удалении пациента из общего списка (иконка в таблице)
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
  onFilterByFIO() {
    this.outFioFilterValue.emit(this.fioFilter)
  }
  onSelectOz(oz: string | null) {
    this.selectOz.emit(oz)
  }
}
