import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { SocketService } from './services/socket.service';
import * as Push from 'push.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(public auth: AuthService, public socket: SocketService) {
    Push.Permission.request(this.onGranted, this.onDenied);
  }

  onGranted() {
    console.log('Notifications Granted!');
  }

  onDenied() {
    console.log('Notifications Denied.');
  }
}
