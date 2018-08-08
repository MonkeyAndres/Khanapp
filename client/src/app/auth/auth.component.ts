import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GamesService } from '../services/games.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  operation: string;
  inverseOperation: string;
  message: string;
  newUser: any = {};

  constructor(
    public auth: AuthService,
    public router: Router,
    public gameService: GamesService,
    public socket: SocketService
  ) {}

  ngOnInit() {
    this.operation = this.router.url.replace('/', '');
    this.inverseOperation = this.operation === 'login' ? 'signup' : 'login';

    if (this.operation === 'login') {
      this.message = 'You don\'t';
    } else { this.message = 'Already'; }
  }

  onSubmit(form: NgForm) {
    if (this.operation === 'login') {
      this.auth.login(form.value).subscribe(() => {
        // Add user to room (for notifications)
        this.gameService.getNext()
        .subscribe((data: Array<any>) => {
          for (const game of data) {
            this.socket.joinRoom(game.title);
          }
          // Redirect Profile
          this.router.navigate(['/profile']);
        });
      });
    } else {
      this.auth.signup(form.value).subscribe(() => this.router.navigate(['/profile']));
    }
  }

  changeForm(event) {
    event.preventDefault();
    this.router.navigate([`/${this.inverseOperation}`]);
  }
}
