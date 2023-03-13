import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/internal/operators/first';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  angForm!: FormGroup
  constructor(
    private fb: FormBuilder,
    private dataService: ApiService,
    private router: Router
  ) {
    this.angForm = this.fb.group({
      email: ['', [Validators.required,  Validators.email, Validators.minLength(1)]],
      password: ['', Validators.required],
    })
  }

  postdata(angForm: FormGroup) {
    this.dataService.userLogin(angForm.value.email, angForm.value.password)
      .pipe(first())
      .subscribe((data: any) => {
        console.log(data);
        if (data.message === 'success') {
          this.router.navigate(['/dashboard'])
        }

        // const redirect: any = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/dashboard'
      },
      (error: any) => {
        alert("User login or password is incorrect")
      });
  }
}
