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
    //* на каждом шагу добавляем в запрос this.query значение val ('org', 'type', 'number', 'date')
    //* в итоге получается объект Map с соответствующими ключами и значениями
    this.query.set(val, this.orgFormGroup.value[val as keyof Object] as unknown as string)
  }

  getResult() {
    //* в переменную this.arr (отфильтрованный временный массив) записываем массив resultArr, из которого исключены все прооперированные пациенты
    this.arr = this.resultArr.filter(el => !el.isOperated)

    //* делаем из объекта Map массив, состоящий из массивов, которые, в свою очередь, содержат по два элемента:
    //* 1-й - ключ
    //* 2-й - значение данного ключа
    let queryArr = Object.entries(Object.fromEntries(this.query.entries()))

    for (let [key, value] of queryArr) {
      if (key !== 'date' && key !== 'number') {
        //* Если значение ключа равно org или type
        //* фильтруем временный массив и в итоге получаем массив, который отфильтрован по организации и типу протезирования
        this.arr = this.arr.filter(el => el[key] === (value as string).toLowerCase())
      } else if (key === 'number') {
        //* если значение ключа равно number
        //* ищем в массиве arr (отфильтрованный массив по организации и типу протезирования)
        //* пациента с указанным значением number
        this.patient = this.arr.find(el => el.number.toLowerCase() == (value as string).toLowerCase());
        //* затем ищем порядковый номер найденного пациента в массиве arr
        this.number = this.arr.indexOf(this.patient);
      }
    }

    //* Если пациент найден в массиве, проводим проверку введенной даты
    if (this.patient) {
      //* фактическая дата постановки пациента на учет
      const patientDate = new Date(this.patient.date);
      //* введенная дата постановки на учет в форме
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
    this.dataService.getAll().subscribe({ next: (data: any) => this.resultArr = data })
  }
}
