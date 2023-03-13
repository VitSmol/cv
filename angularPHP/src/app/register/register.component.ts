import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/internal/operators/first';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  angForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private dataService: ApiService,
    private router: Router) {
    this.angForm = this.fb.group({
      f_name: ['', Validators.required],
      l_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.minLength(1)]],
      password: ['', Validators.required],
      mobile: ['', Validators.required],
    })
  }
  postdata(angForm: FormGroup) {
    this.dataService.userregistration(
      angForm.value.f_name,
      angForm.value.l_name,
      angForm.value.email,
      angForm.value.password,
      angForm.value.mobile,
    )
      .pipe(first())
      .subscribe((data: any) => {
        this.router.navigate(['login']);
      }, (error: any) => { })

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
