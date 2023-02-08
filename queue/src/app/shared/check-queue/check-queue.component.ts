import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StepperOrientation } from '@angular/material/stepper';
import { map, Observable } from 'rxjs';
import { usersInfo } from 'src/app/admin/data/data';
import { DataHandlerService } from '../data-handler.service';
import { Org } from '../interfaces/interfaces';

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
    this.dataService.getAll().subscribe({next: (data: any) => this.arr = data})
  }

  log(val: string) {
    // TODO
      const filterValue = this.orgFormGroup.value[val as keyof Object]
      this.arr =  this.arr.filter(el => el[val as keyof Object] === filterValue)
    console.log(
      this.arr
    );

  }

}
