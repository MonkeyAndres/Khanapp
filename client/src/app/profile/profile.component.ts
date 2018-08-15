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

    this.games.getPlayedBy(this.auth.user.username) // Get games played by user
    .subscribe(data => this.playedGames = Object(data));
  }

  updateProfile() {
    this.editProfile = false; // Deactivate edituser component
    this.createGame = false; // Deactivate creategame component
    this.auth.isLogged().subscribe(data => { // Refresh user data
      this.ngOnInit(); // Recalculate created and played games
    });
  }

  // When the tab change edit the fab button and deactivate unfocused components
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

  // Change the component when click the fab
  changeComponent() {
    // If the fabicon is edit or the edit component is active
    if (this.fabIcon === 'edit' || this.editProfile) {
      this.editProfile = !this.editProfile; // Tooggle editprofile component
      this.fabIcon = this.editProfile ? 'close' : 'edit'; // Tooggle fabicon

      // If the fabicon is add or the creategame component is active
    } else if (this.fabIcon === 'add' || this.createGame) {
      this.createGame = !this.createGame; // Tooggle creategamecomponent component
      this.fabIcon = this.createGame ? 'close' : 'add'; // Tooggle fabicon
    }
  }
}
