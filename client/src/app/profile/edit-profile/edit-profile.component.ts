import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from './../../services/auth.service';
import { PlayerService } from '../../services/player.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  @Input() user: any;

  username: string;
  bio: string;

  constructor(public playerService: PlayerService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.username = this.user.username;
    this.bio = 'Patata!!';
  }

  editInfo(form: NgForm) {
    const player = form.value;
    player._id = this.user._id;
    console.log(player);

    this.playerService.edit(player).subscribe(data => {
      this.snackBar.open('Profile Edited', '', { duration: 2000 });
    });
  }
}
