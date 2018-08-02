import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {

  constructor(public game: GamesService) { }

  ngOnInit() {
  }

  createGame(form: NgForm) {
    console.log(form.value);
    this.game.create(form.value).subscribe(data => {
      console.log(data);
    });
  }

}
