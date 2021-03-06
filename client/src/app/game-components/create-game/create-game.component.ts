import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GameareaDrawerComponent } from '../../maps/gamearea-drawer/gamearea-drawer.component';
import { GamesService } from '../../services/games.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {
  @ViewChild(GameareaDrawerComponent) gameArea; // Select game area drawer child component

  @Output() done = new EventEmitter<void>(); // Output for refresh the profile (see profile component)

  message: string;
  newGame: any = {};

  constructor(
    public game: GamesService,
    public router: Router,
    public socket: SocketService
  ) { }

  ngOnInit() {
  }

  createGame(form: NgForm) {
    if (this.gameArea.completed) {
      // Add to the form values the game area data.
      form.value.gameArea = this.gameArea.data;
      form.value.middlePos = this.gameArea.middle;

      // Create the game.
      this.game.create(form.value).subscribe(data => {
        this.socket.joinRoom(form.value.title); // Join this game socket.io rooms.
        form.reset(); // Reset the form.
        this.done.emit(); // Update profile data.
      });
    }
  }

}
