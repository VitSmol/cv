import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments.prod';
import { Auth, User } from './interfaces/interfaces';

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
    `, user )
  }
}
