import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import * as Push from 'push.js';
import { Router } from '@angular/router';

const BASEURL = environment.BASEURL;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  socket: SocketIOClient.Socket;

  constructor(public router: Router) {
    this.socket = io(BASEURL);
    this.socket.on('connect', () => console.log('Connected to WS'));

    this.socket.on('sendNotification', (data) => {
      Push.create(data.title, {
          body: data.body,
          timeout: 4000,
          onClick: () => {
            this.router.navigate([data.link]);
          }
      });
    });
  }
}