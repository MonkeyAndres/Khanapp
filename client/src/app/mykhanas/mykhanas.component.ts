import { Component, OnInit } from '@angular/core';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'app-mykhanas',
  templateUrl: './mykhanas.component.html',
  styleUrls: ['./mykhanas.component.scss']
})
export class MykhanasComponent implements OnInit {

  nextGames: any;

  constructor(public game: GamesService) { }

  ngOnInit() {
    // Get the games that start in a week or less and show them
    this.game.getNext()
      .subscribe(data => (this.nextGames = data));
  }

}
