import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CRUD } from './crud.interface';

@Injectable({
  providedIn: 'root'
})
export class ChallengesService implements CRUD {
  BASEURL: string = environment.BASEURL;
  options: object = {withCredentials: true, responseType: 'text'};

  constructor(public http: HttpClient) { }

  create(challenge) {
    return this.http.post(`${this.BASEURL}/api/challenge`, challenge, this.options);
  }

  edit(challenge) {
    return this.http.put(`${this.BASEURL}/api/challenge/${challenge._id}`, challenge, this.options);
  }

  getOne(id) {
    return this.http.get(`${this.BASEURL}/api/challenge/${id}`, this.options);
  }

  delete(id) {
    return this.http.delete(`${this.BASEURL}/api/challenge/${id}`, this.options);
  }
}
