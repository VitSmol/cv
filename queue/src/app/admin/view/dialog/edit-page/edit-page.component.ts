import { Component, OnInit, Inject } from '@angular/core';
import { CheckboxControlValueAccessor, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnsNames, FullName, ProstheticsType } from '../../../shared/interfaces/interfaces';
import { PatientService } from '../../../shared/services/patient.service';
import { Oz, Patient, Types } from '../../../shared/interfaces/phpInterface';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.sass']
})
export class EditPageComponent implements OnInit {
  ColumnsNames = ColumnsNames;
  addForm: FormGroup
  date: Date = new Date();
  maxDate: string = '';
  patient_id: string = '';
  patient!: Patient;
  patient_isOperated: boolean = false;

  types: Types[] = []//[ProstheticsType.teks, ProstheticsType.tets];
  orgs: Oz[] = [] //= [FullName.ggkb1, FullName.gokb, FullName.kalink, FullName.mozyr, FullName.rechica, FullName.svetlogorsk, FullName.zlobin];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: PatientService,
    private url: ActivatedRoute,

    public dialogRef: MatDialogRef<EditPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: [Patient, string],
    public dialog: MatDialog

  ) {
    this.addForm = this.formBuilder.group({
      id: [],
      listnumber: ['', Validators.required],
      date: ['', Validators.required],
      lastname: ['', Validators.required],
      name: ['', Validators.required],
      fathername: [''],
      address: ['', Validators.required],
      sex: [''],
      birthday: ['', Validators.required],
      diag: ['', Validators.required],
      side: [''],
      invalidgroup: [''],
      isOperated: [''],
      operdate: [''],
      info: [''],
      org: ['', Validators.required],
      type: ['', Validators.required]
    })
    // this.addForm.get('date')?.disable()
  }

  public dialogTitle: string = '';

  ngOnInit(): void {
    this.patient = this.data[0];
    this.dialogTitle = this.data[1];
    if (+this.patient.id > 0) {
      this.service.getPatient(+this.patient.id).subscribe(response => {
        this.patient = response as Patient;
        this.addForm.patchValue(this.patient);
      })
    }
    this.service.getOz().subscribe((data: Oz[]) => this.orgs = data);
    this.service.getTypes().subscribe((data: Types[]) => this.types = data);
  }

  //! выбирает дату не более текущей для поля date (дата постановки на учет)
  getMaxDate(date: Date): string {
    const check = (val: number): string => val < 10 ? '0' + val : val as unknown as string;
    let day = check(date.getDate())
    let month = check(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  onEdit() {
    this.patient = this.addForm.value;
    this.patient.isOperated = this.patient_isOperated ? '1' : '0';
    //! Цикл убирает лишние пробелы в полях
    for (let [key, value] of Object.entries(this.patient)) {
      typeof value === 'string' ? this.patient[key as keyof Patient] = value.trim() : null
    }

    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        dialogTitle: 'Изменение данных пользователя',
        message: `Вы действительно хотите изменить данные о пациенте ${this.patient.lastname} ${this.patient.name} ${this.patient.fathername}?`
      },
      autoFocus: false,
      width: '300px'
    })
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) this.dialogRef.close({
        message: 'update',
        patient: this.patient
      })
    })
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        dialogTitle: 'Удалить пользователя',
        message: `Вы действительно хотите удалить данные о пациенте ${this.patient.lastname} ${this.patient.name} ${this.patient.fathername}?`
      },
      autoFocus: false,
      width: "300px"
    })
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.dialogRef.close({
          message: 'delete',
          patient: this.patient
        })
      }
    })
  }

  onCancel() {
    this.dialogRef.close(null)
  }

  checkbox(e: Event) {
    this.patient_isOperated = (e.target as HTMLInputElement).checked ? true : false
  }
}
