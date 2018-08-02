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

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
