import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnsNames, FullName, Patient, ProstheticsType } from '../shared/interfaces';
import { PatientService } from '../shared/patient.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.sass']
})
export class EditPageComponent implements OnInit {
  ColumnsNames = ColumnsNames;
  addForm: any
  date: Date = new Date();
  maxDate: string = '';
  patient_id: string = '';
  patient!: Patient;
  patient_isOperated: boolean = false;

  types: string[] = [ProstheticsType.teks, ProstheticsType.tets];
  orgs: string[] = [FullName.ggkb1, FullName.gokb, FullName.kalink, FullName.mozyr, FullName.rechica, FullName.svetlogorsk, FullName.zlobin];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private patientService: PatientService,
    private url: ActivatedRoute,
  ) {
    this.addForm = this.formBuilder.group({
      id: [],
      listnumber: ['', Validators.required],
      date: [this.getMaxDate(this.date), Validators.required],
      lastname: ['', Validators.required],
      name: ['', Validators.required],
      fathername: [''],
      address: ['', Validators.required],
      sex: [''],
      birthday: ['', Validators.required],
      diag: ['', Validators.required],
      side: [''],
      invalidgroup: [''],
      operDate: [''],
      info: [''],
      org: ['', Validators.required],
      type: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.patient_id = this.url.snapshot.params['id']
    if (+this.patient_id > 0) {
      this.patientService.getPatient(+this.patient_id).subscribe(response => {
        this.patient = response[`data` as keyof object];
        this.patient.isOperated == '0' ? this.patient_isOperated = false : this.patient_isOperated = true;
        this.addForm.patchValue(response[`data` as keyof object]);
      })
    }
  }

  getMaxDate(date: Date): string {
    const check = (val: number): string => val < 10 ? '0' + val : val as unknown as string;
    let day = check(date.getDate())
    let month = check(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  onEdit() {
    const patient = this.addForm.value;

    this.patientService.updatePatient(patient).subscribe((data: any) => {
      this.router.navigate(['admin', 'list'])
    },
      err => {
        console.log(err)
      })
  }

  // TODO реализовать проверку чекбокса
}
