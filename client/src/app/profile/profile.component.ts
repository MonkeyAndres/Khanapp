import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  createdGames: Array<any>;
  playedGames: Array<any>;
  fabIcon = 'edit';

  editProfile = false;
  createGame = false;

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

  tabChanged(tabGroup) {
    switch (tabGroup.selectedIndex) {
      case 0:
        this.fabIcon = 'edit';
        break;
      case 1:
        this.fabIcon = 'add';
        break;
      case 2:
        this.fabIcon = '';
        break;
    }
  }

  changeComponent() {
    if (this.fabIcon === 'edit') {
      this.editProfile = !this.editProfile;
    } else { this.createGame = !this.createGame; }
  }
}
