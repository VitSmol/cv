import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StepperOrientation } from '@angular/material/stepper';
import { map, Observable } from 'rxjs';
import { usersInfo } from 'src/app/admin/data/data';
import { DataHandlerService } from '../data-handler.service';
import { ColumnsNames, Org, ProstheticsType } from '../interfaces/interfaces';

interface Query {
  date?: Date,
  number?: number,
  type?: string,
  org?: string,
}

@Component({
  selector: 'app-check-queue',
  templateUrl: './check-queue.component.html',
  styleUrls: ['./check-queue.component.sass']
})
export class CheckQueueComponent implements OnInit {
  arr: any[] = [];
  resultArr: any[] = [];
  query = new Map();
  usersInfo: Org[] = usersInfo
  isEditable = true;
  ProstheticsType = ProstheticsType;
  patient: any
  number: any
  org: any
  ColumnsNames = ColumnsNames

  //! for stepper
  stepperOrientation: Observable<StepperOrientation>;
  orgFormGroup = this.formBuilder.group({
    org: ['', Validators.required],
    type: ['', Validators.required],
    number: ['', Validators.required],
    date: ['', Validators.required],
  })
  typeFormGroup = this.formBuilder.group({
  })
  numberFormGroup = this.formBuilder.group({
  })
  dateFormGroup = this.formBuilder.group({
  })
  //! end for stepper

  constructor(
    public formBuilder: FormBuilder,
    public breakPointObserver: BreakpointObserver,
    private dataService: DataHandlerService
  ) {
    this.stepperOrientation = breakPointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')))
  }

  ngOnInit() {
    this.dataService.getAll().subscribe({ next: (data: any) => this.arr = data })
  }

  getQuery(val: string) {
    this.query.set(val, this.orgFormGroup.value[val as keyof Object] as unknown as string)
    // console.log(this.query);


    // let filterValue: string = ''
    // if (val === 'date') {
    //   console.log(this.orgFormGroup.value);
    //   return
    // } else {
    //   filterValue = (this.orgFormGroup.value[val as keyof Object] as unknown as string).toLowerCase();
    // }

    // if (val === 'number') {
    //   console.log(this.orgFormGroup.value);
    //   this.patient = this.arr.find(el => el.number.toLowerCase() == filterValue)
    //   console.log(filterValue);
    //   if (!this.patient) return;
    //   this.org = usersInfo.find(user => user.shortName.toLowerCase() === this.patient.org)
    //   this.number = this.arr.indexOf(this.patient);
    //   return
    // }

    // //! filter array
    // this.arr = this.arr.filter(el => el[val as keyof Object] === filterValue).sort((a: { [x: string]: any; }, b: { [x: string]: any; }) => a[ColumnsNames.date] - b[ColumnsNames.date])
    // console.log(this.arr);

  }

  getResult() {
    this.arr = this.arr.filter(el => !el.isOperate)

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
      console.log(this.arr);
      const patientDate = new Date(this.patient.date);
      const queryDate = new Date(this.query.get('date'));
      const patientResultDate = '' + patientDate.getFullYear() + patientDate.getMonth() + patientDate.getDate()
      const queryDateResult = '' + queryDate.getFullYear() + queryDate.getMonth() + queryDate.getDate()
      console.log(this.patient.fio);

      this.patient.fio = this.dataService.decode(this.patient.fio)
      if (patientResultDate !== queryDateResult) {
        delete this.patient;
        return
      }
    }
  }
}
