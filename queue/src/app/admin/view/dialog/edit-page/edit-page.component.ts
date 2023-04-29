import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnsNames, FullName, ProstheticsType } from '../../../shared/interfaces/interfaces';
import { PatientService } from '../../../shared/services/patient.service';
import { Oz, Patient } from '../../../shared/interfaces/phpInterface';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

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

  types: string[] = [ProstheticsType.teks, ProstheticsType.tets];
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
    this.addForm.get('date')?.disable()
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
    this.service.getOz().subscribe((data: Oz[]) => {
      this.orgs = data
    })
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
    console.log(this.patient);

    for (let [key, value] of Object.entries(this.patient)) {
      typeof value === 'string' ? this.patient[key as keyof Patient] = value.trim() : null
    }
    console.log(this.patient);
    // return
    this.dialogRef.close(this.patient)

    //TODO Обновление пациента прямо из окна (раскомментировать в экстренной ситуации)
    // this.patientService.updatePatient(this.patient).subscribe((data: any) => {
    //   this.dialogRef.close(this.patient)
    // },
    //   err => {
    //     console.log(err)
    //   })
  }

  onCancel() {
    this.dialogRef.close(null)
  }
  checkbox(e: any) {
    this.patient_isOperated = e.target.checked ? true : false
    console.log(this.addForm.value.isOperated);

  }
}
