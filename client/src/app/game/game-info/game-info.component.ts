import { Component, OnInit } from '@angular/core';
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

  coordinates: Array<LatLngLiteral> = [
    {
      lng: -3.8925171084702015,
      lat: 40.64290401421364
    },
    {
      lng: -3.9913940615952015,
      lat: 40.32851617573386
    },
    {
      lng: -3.4393310733139515,
      lat: 40.210110178362626
    },
    {
      lng: -3.3926391787827015,
      lat: 40.50312585039377
    },
    {
      lng: -3.6521911807358265,
      lat: 40.658532648333896
    },
    {
      lng: -3.8925171084702015,
      lat: 40.64290401421364
    },
  ];

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
