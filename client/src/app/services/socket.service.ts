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
    this.socket = io(BASEURL); // Connect to the socket io server
    this.socket.on('connect', () => console.log('Connected to Socket.io')); // On connection print message

    // When the backend emit a notification...
    this.socket.on('sendNotification', this.createNotification.bind(this));
  }

  // Send a notification
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

  // Joins the user to a socket io room
  joinRoom(room) {
    this.socket.emit('joinRoom', room);
  }

  // Joins the user to the game
  joinGameboard(game) {
    this.socket.emit('joinGameboard', game);
  }
}
