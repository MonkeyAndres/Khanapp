import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
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

  updateProfile() {
    this.editProfile = false;
    this.createGame = false;
    this.auth.isLogged().subscribe(data => {
      this.ngOnInit();
    });
  }

  tabChanged(tabGroup) {
    switch (tabGroup.selectedIndex) {
      case 0:
        this.fabIcon = 'edit';
        this.editProfile = false;
        break;
      case 1:
        this.fabIcon = 'add';
        this.createGame = false;
        break;
      case 2:
        this.fabIcon = '';
        this.editProfile = false;
        this.createGame = false;
        break;
    }
  }

  changeComponent() {
    if (this.fabIcon === 'edit' || this.editProfile) {
      this.editProfile = !this.editProfile;
      this.fabIcon = this.editProfile ? 'close' : 'edit';
    } else if (this.fabIcon === 'add' || this.createGame) {
      this.createGame = !this.createGame;
      this.fabIcon = this.createGame ? 'close' : 'add';
    }
  }
}
