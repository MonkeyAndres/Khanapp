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
    // This converts /login in login and store it.
    this.operation = this.router.url.replace('/', '');

    // This store the inverse operation.
    this.inverseOperation = this.operation === 'login' ? 'signup' : 'login';

    // Change the message at the end of the page depending of the operation.
    if (this.operation === 'login') {
      this.message = 'You don\'t';
    } else { this.message = 'Already'; }
  }

  // When the form is submited...
  onSubmit(form: NgForm) {
    if (this.operation === 'login') {
      this.auth.login(form.value).subscribe(() => {
        this.joinNextKhanasRooms(); // When the user logged in...
      });
    } else {
      this.auth.signup(form.value).subscribe(() => this.router.navigate(['/profile']));
    }
  }

  /**
   * Search the next khanas that the user have.
   * On each khana join the user to its khana socket.io room.
   */
  joinNextKhanasRooms() {
    this.gameService.getNext()
    .subscribe((data: Array<any>) => {
      for (const game of data) {
        this.socket.joinRoom(game.title);
      }
      this.router.navigate(['/profile']);
    });
  }

  // When the user isn't register or is already register only navigate to the inverse operation route
  changeForm(event) {
    event.preventDefault();
    this.router.navigate([`/${this.inverseOperation}`]);
  }
}
