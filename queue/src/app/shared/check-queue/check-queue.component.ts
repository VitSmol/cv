import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StepperOrientation } from '@angular/material/stepper';
import { map, Observable } from 'rxjs';
import { usersInfo } from 'src/app/admin/data/data';
import { DataHandlerService } from '../data-handler.service';
import { ColumnsNames, Org, ProstheticsType } from '../interfaces/interfaces';

@Component({
  selector: 'app-check-queue',
  templateUrl: './check-queue.component.html',
  styleUrls: ['./check-queue.component.sass']
})
export class CheckQueueComponent implements OnInit {
  arr: any[] = [];
  query: any
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

  log(val: string) {
    // TODO  1. Навести порядок с регистром (сделать всё верхним)
    // TODO  2. Доделать логику фильтрации массива (в случае)
    // TODO  3. Закончить stepper

    const filterValue = (this.orgFormGroup.value[val as keyof Object] as unknown as string).toLowerCase();
    if (val === 'number') {
      console.log(this.orgFormGroup.value);
      this.patient = this.arr.find(el => el.number == filterValue)
      if (!this.patient) return;
      this.org = usersInfo.find(user => user.shortName.toLowerCase() === this.patient.org)
      this.number = this.arr.indexOf(this.patient);
      return
    }
    this.arr = this.arr.filter(el => el[val as keyof Object] === filterValue).sort((a: { [x: string]: any; }, b: { [x: string]: any; }) => a[ColumnsNames.number] - b[ColumnsNames.number])
    console.log(filterValue);
    console.log(this.arr);

  }
}
