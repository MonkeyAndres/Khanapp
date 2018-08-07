import { Injectable } from '@angular/core';
import { CRUD } from './crud.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GamesService implements CRUD {
  BASEURL: string = environment.BASEURL;
  options: object = {withCredentials: true};

  constructor(public http: HttpClient) { }

  create(game) {
    return this.http.post(`${this.BASEURL}/api/game/`, game, this.options);
  }

  edit(game) {
    return this.http.put(`${this.BASEURL}/api/game/${game._id}`, game, this.options);
  }

  getAll() {
    return this.http.get(`${this.BASEURL}/api/game/`, this.options);
  }

  getOne(id) {
    return this.http.get(`${this.BASEURL}/api/game/${id}`, this.options);
  }

  getPlayedBy(username) {
    return this.http.get(`${this.BASEURL}/api/game/played/${username}`, this.options);
  }

  getNext() {
    return this.http.get(`${this.BASEURL}/api/game/next`, this.options);
  }

  findNear(coords) {
    const coordinates = [coords.longitude, coords.latitude];
    return this.http.post(`${this.BASEURL}/api/game/near/`, {coordinates}, this.options);
  }

  delete(id) {
    return this.http.delete(`${this.BASEURL}/api/game/${id}`, this.options);
  }

  addPlayerToGame(playerId, gameId) {
    return this.http.post(`${this.BASEURL}/api/game/${gameId}/${playerId}`, {}, this.options);
  }
}
