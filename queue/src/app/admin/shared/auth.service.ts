import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environments.prod';
import { allowedIPs } from '../data/data';
import { Auth, Resp, User } from './interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements Auth {


  constructor(
    private http: HttpClient
  ) { }

  login(user: User) {
    return this.http.post(`
    https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}
    `, user).pipe(
      tap(this.setToken)
    )
  }

  setToken(response: Resp | null) {
    if (response) {
      const expData = new Date().getTime() + +(response.expiresIn as string) * 1000;
      localStorage.setItem('fb-token-exp', expData.toString());
      localStorage.setItem('fb-token', response.idToken as string);
    } else {
      localStorage.clear();
    }
  }
  get token() {
    const expDate = new Date(localStorage.getItem('fb-token-exp') as string);
    if ( new Date() > expDate ) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token')
  }

  logout() {
    this.setToken(null);
  }

  isAuth() {
    return !!this.token
  }

  async getIP() {
    const resp = await fetch('https://api.ipify.org')
    const data = await resp.text()
    if (allowedIPs.includes(data)) {
      return true;
    }
    return false;
  }
}
