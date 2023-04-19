import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ColumnsNames, FullName, ProstheticsType } from '../shared/interfaces/interfaces';
import { PatientService } from '../shared/services/patient.service';

@Component({
  selector: 'app-once-add',
  templateUrl: './once-add.component.html',
  styleUrls: ['./once-add.component.sass']
})
export class OnceAddComponent {
  ColumnsNames = ColumnsNames;
  addForm: any
  date: Date = new Date();
  maxDate: string = '';
  types: string[] = [ProstheticsType.teks, ProstheticsType.tets];
  orgs: string[] = [FullName.ggkb1, FullName.gokb, FullName.kalink, FullName.mozyr, FullName.rechica, FullName.svetlogorsk, FullName.zlobin];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private patientService: PatientService
    ) {
      this.addForm = this.formBuilder.group({
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
        info: [''],
        org: ['', Validators.required],
        type: ['', Validators.required]
      })
    }

    // Метод находит текущую дату, переводит в человекочитаемый формат и делее устанавливает в дефолтное 
    getMaxDate(date: Date): string {
      const check = (val: number): string => val < 10 ? '0' + val : val as unknown as string;
      let day  = check(date.getDate())
      let month = check(date.getMonth() + 1);
      const year = date.getFullYear();
      return `${year}-${month}-${day}`;
    }

    onSubmit() {
      const patient = this.addForm.value;
      this.patientService.createPatient(patient).subscribe((data: any) => {
        this.router.navigate(['admin','list'])
      },
      err => {
        console.log(err)
      })
    }
}
