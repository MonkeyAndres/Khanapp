import { Component, OnInit } from '@angular/core';
import { AuthService, User } from './../services/auth.service';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  createdGames: Array<any>;
  playedGames: Array<any>;

  constructor(public auth: AuthService, public games: GamesService) { }

  ngOnInit() {
    this.auth.isLogged().subscribe(user => {
      this.createdGames = this.auth.user.createdGames;
      this.games.getPlayedBy(this.auth.user.username)
      .subscribe(data => this.playedGames = Object(data));
    });
  }

}
