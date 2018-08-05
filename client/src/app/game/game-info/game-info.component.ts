import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from './../../services/games.service';
import { LatLngLiteral } from '@agm/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit {
  gameTitle = 'Game Info';
  gameId: string;
  game: any;

  constructor(public route: ActivatedRoute, public gameService: GamesService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.gameId = params.id;
      this.gameService
        .getOne(this.gameId)
        .subscribe(game => (this.game = game));
    });
  }
}
