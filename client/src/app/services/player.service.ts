import { Injectable } from '@angular/core';
import { CRUD } from './crud.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerService implements CRUD {
  BASEURL: string = environment.BASEURL;
  options: object = {withCredentials: true, responseType: 'text'};

  constructor(public http: HttpClient) { }

  create(player) {
    return this.http.post(`${this.BASEURL}/api/user/`, player, this.options);
  }

  edit(player) {
    return this.http.put(`${this.BASEURL}/api/user/`, player, this.options);
  }

  getOne(username) {
    return this.http.get(`${this.BASEURL}/api/user/${username}`, this.options);
  }

  delete() {
    return this.http.put(`${this.BASEURL}/api/user/`, this.options);
  }
}
