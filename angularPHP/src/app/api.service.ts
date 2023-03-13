import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { Users } from './users';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseURL = 'http://localhost/php/'

  constructor(
    private http: HttpClient,
  ) { }

    public userregistration(f_name: string, l_name: string, email: string, password: string, mobile: string) {
      return this.http.post<any>(this.baseURL + 'register.php', {
        f_name, l_name, email, password, mobile
      }).pipe(map(Users => {
        return Users
      }));
    }

    public userLogin(email: string, password: string) {
      return this.http.post<any>(this.baseURL + 'login.php', {
        email, password
      }).pipe(map(Users => {
        // console.log(Users.email);
        this.setToken(Users.email);
        // this.getLoggedInName.emit(true);
        return Users;
      }))
    }

    setToken(token: string) {
      localStorage.setItem('token', token);
    }

    showAll() {

    }

}
