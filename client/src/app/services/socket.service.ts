import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import * as Push from 'push.js';
import { Router } from '@angular/router';

const BASEURL = environment.BASEURL;

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket: SocketIOClient.Socket;

  constructor(public router: Router) {
    this.socket = io(BASEURL);
    this.socket.on('connect', () => console.log('Connected to Socket.io'));

    this.socket.on('sendNotification', this.createNotification.bind(this));
  }

  joinRoom(room) {
    this.socket.emit('joinRoom', room);
  }

  createNotification(data) {
    if (Push.Permission.has()) {
      Push.create(data.title, {
          body: data.body,
          onClick: () => this.router.navigate([data.link])
      });
    } else {
      console.log('Can\'t send notification.');
    }
  }

  joinGameboard(game) {
    this.socket.emit('joinGameboard', game);
  }
}
