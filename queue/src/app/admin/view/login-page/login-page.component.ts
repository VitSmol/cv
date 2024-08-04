import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/admin/shared/services/auth.service';
import { Emails } from 'src/app/admin/shared/interfaces/interfaces';

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
  isAllowed!: boolean;
  Ip: boolean = true;
  checkIp: boolean = false; //TODO change this to true when ready to deploy

  constructor(
    public auth: AuthService,
    private router: Router
  ){}

  async ngOnInit() {
    //TODO uncomment this when ready to deploy and add other IP in allowedIPs from data.ts
    // this.isAllowed  =  await this.auth.getIP();
    // if (!this.isAllowed) {
    //   this.Ip = false;
    //   console.log(`IP is not allowed`);
    // }
    // this.checkIp = false;
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'E-mail не введен';
    }
    return this.email.hasError('email') ? 'E-mail введен не корректно' : '';
  }

  async submit() {
    this.isLogin = true;
    if (this.email.invalid || this.password.invalid) {
      return;
    }
    this.submitted = true;
    const user = {
      email: this.email.value as string,
      password: this.password.value as string,
      returnSecureToken: true
    }
    this.auth.login(user).subscribe(res => {
      console.log(res);
      if (res?.email === Emails.admin) {
        this.router.navigate(['/admin', 'dashboard']);
      } else {
        this.router.navigate(['/', '/']);
      }
      this.submitted = false;
      this.isError = false;
    }, ()=> {
      this.submitted = false;
      this.isError = true;
      this.isLogin = false;
    })
  }
}
