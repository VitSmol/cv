import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ColumnsNames } from '../shared/interfaces';
import { PatientService } from '../shared/patient.service';

@Component({
  selector: 'app-once-add',
  templateUrl: './once-add.component.html',
  styleUrls: ['./once-add.component.sass']
})
export class OnceAddComponent {
  ColumnsNames = ColumnsNames;
  addForm: any

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private patientService: PatientService
    ) {
      this.addForm = this.formBuilder.group({
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
        // operDate: [''],
        info: [''],
      })
    }
    onSubmit() {

      console.log(this.addForm.value);

    }
}
