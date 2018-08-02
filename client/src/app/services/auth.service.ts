import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  BASEURL: string = environment.BASEURL;
  options: object = {withCredentials: true};

  constructor(public http: HttpClient) {
    // this.isLogged().subscribe(
    //   data => this.user = data,
    //   error => console.log('Not Logged In')
    // );
  }

  login(user: User) {
    return this.http.post(`${this.BASEURL}/api/auth/login`, user, this.options).pipe(
      tap((data: User) => this.user = data),
    );
  }

  signup(user: User) {
    return this.http.post(`${this.BASEURL}/api/user`, user, this.options).pipe(
      tap((data: User) => this.user = data),
    );
  }

  isLogged() {
    return this.http.post(`${this.BASEURL}/api/auth/loggedin`, {}, this.options).pipe(
      tap(data => this.user = data),
    );
  }

  logout() {
    return this.http.post(`${this.BASEURL}/api/auth/logout`, {}, this.options).pipe(
      tap((data: User) => this.user = null)
    );
  }
}
