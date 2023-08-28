import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { StepperOrientation } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { usersInfo } from 'src/app/admin/shared/data';
import { DataHandlerService } from '../data-handler.service';
import { ColumnsNames, Org, ProstheticsType } from '../../admin/shared/interfaces/interfaces';

@Component({
  selector: 'app-check-queue',
  templateUrl: './check-queue.component.html',
  styleUrls: ['./check-queue.component.sass'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
  ]
})
export class CheckQueueComponent implements OnInit {
  arr: any[] = [];
  resultArr: any[] = [];
  query = new Map();
  usersInfo: Org[] = usersInfo
  isEditable = true;
  ProstheticsType = ProstheticsType;
  disabled: boolean = true
  patient: any
  number: any
  org: any
  ColumnsNames = ColumnsNames
  selected: string = ''

  //! for stepper
  stepperOrientation: Observable<StepperOrientation>;
  orgFormGroup = this.formBuilder.group({
    org: ['', Validators.required],
    type: ['', Validators.required],
    number: ['', Validators.required],
    date: ['', Validators.required],
  })
  //! end for stepper

  constructor(
    public formBuilder: FormBuilder,
    public breakPointObserver: BreakpointObserver,
    private dataService: DataHandlerService,
    private router: Router,
    @Inject(MAT_DATE_LOCALE) private _locale: string
  ) {
    this.stepperOrientation = breakPointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')))
  }

  ngOnInit() {
    this.dataService.getAll().subscribe({ next: (data: any) => this.resultArr = data })
  }

  // добавляем данные в запрос
  getQuery(val: string) {
    this.query.set(val, this.orgFormGroup.value[val as keyof Object] as unknown as string)
  }

  getResult() {
    this.arr = this.resultArr.filter(el => !el.isOperated)

    let queryArr = Object.entries(Object.fromEntries(this.query.entries()))
    for (let [key, value] of queryArr) {
      if (key !== 'date' && key !== 'number') {
        this.arr = this.arr.filter(el => el[key] === (value as string).toLowerCase())
      } else if (key === 'number') {
        this.patient = this.arr.find(el => el.number.toLowerCase() == (value as string).toLowerCase());
        this.number = this.arr.indexOf(this.patient);
      }
    }

    if (this.patient) {
      const patientDate = new Date(this.patient.date);
      const queryDate = new Date(this.query.get('date'));
      const patientResultDate = '' + patientDate.getFullYear() + patientDate.getMonth() + patientDate.getDate()
      const queryDateResult = '' + queryDate.getFullYear() + queryDate.getMonth() + queryDate.getDate()
      this.patient.fio = this.dataService.decode(this.patient.fio)

      if (patientResultDate !== queryDateResult) {
        delete this.patient;
        return
      }
    }
  }

  updateValues() {
    if (this.patient) {
      this.patient.fio = this.dataService.encode(this.patient.fio)
    }
    this.query.clear()
  }
}
