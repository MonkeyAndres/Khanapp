import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { GamesService } from '../services/games.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss']
})
export class GameboardComponent implements OnInit {

  gameId: string;
  game: any;
  innerHeight: string;

  constructor(
    public gameService: GamesService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.innerHeight = (window.screen.height - 48 - 28 - 56) + 'px';

    this.route.params.subscribe(params => (this.gameId = params.id));

    this.gameService.getOne(this.gameId)
      .subscribe(game => {
        this.game = game;
      });
  }

}
