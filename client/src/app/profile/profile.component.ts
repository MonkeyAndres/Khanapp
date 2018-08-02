import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from './../services/auth.service';
import { GamesService } from '../services/games.service';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  createdGames: Array<any>;
  playedGames: Array<any>;
  fabIcon = 'edit';

  constructor(
    public auth: AuthService,
    public games: GamesService,
    public router: Router
  ) { }

  ngOnInit() {
    this.createdGames = this.auth.user.createdGames;
    this.games.getPlayedBy(this.auth.user.username)
    .subscribe(data => this.playedGames = Object(data));
  }

  tabChanged() {
    this.fabIcon = this.fabIcon === 'add' ? 'edit' : 'add';
  }

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
