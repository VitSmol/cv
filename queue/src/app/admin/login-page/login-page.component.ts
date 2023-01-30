import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass']
})
export class LoginPageComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  hide = true;
  submitted = false;
  isLogin = false;
  isError = false;

  constructor(
    public auth: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'E-mail не введен';
    }

    return this.email.hasError('email') ? 'E-mail введен не корректно' : '';
  }

  submit() {
    this.isLogin = true;
    if (this.email.invalid || this.password.invalid) {
      return;
    }
    this.submitted = true;
    const user = {
      email: this.email.value as string,
      password: this.password.value as string,
    }
    // console.log(user);
    this.auth.login(user).subscribe(res => {
      console.log(res);
      this.router.navigate(['/admin', 'dashboard']);
      this.submitted = false;
      this.isError = false;
    }, ()=> {
      this.submitted = false;
      this.isError = true;
      this.isLogin = false;
    })

  }
}
