import { Component, OnInit, Input } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  socket: SocketIOClient.Socket;
  messages: Array<any>;
  newMessage: String;

  @Input() room: String;

  constructor(public socketService: SocketService, public authService: AuthService) { }

  ngOnInit() {
    this.socket = this.socketService.socket;
    this.socket.on('chatUpdate', (data) => this.messages = data);
  }

  sendMessage() {
    this.socket.emit('reciveMessage', this.authService.user.username, this.newMessage, this.room);
    this.newMessage = '';
  }
}
