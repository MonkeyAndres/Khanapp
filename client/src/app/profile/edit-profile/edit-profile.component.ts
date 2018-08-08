import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PlayerService } from '../../services/player.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';

const URL = `${environment.BASEURL}/api/user`;

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  @Input() user: any;
  @Output() done = new EventEmitter<void>();

  username: string;
  bio: string;
  uploader: FileUploader = new FileUploader({url: URL, method: 'PUT'});
  editedUser: any = {};

  constructor(public playerService: PlayerService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.username = this.user.username;
    this.bio = this.user.bio;
  }

  editInfo(form: NgForm) {
    const player = form.value;

    this.uploader.uploadAll();

    this.playerService.edit(player).subscribe(data => {
      this.done.emit();
      this.snackBar.open('Profile Edited', '', { duration: 2000 });
    });
  }
}
