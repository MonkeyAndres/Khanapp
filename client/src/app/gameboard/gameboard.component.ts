import { LatLngLiteral } from '@agm/core';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { GamesService } from '../services/games.service';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss']
})
export class GameboardComponent implements OnInit, OnDestroy  {

  gameId: string;
  game: any;
  mapHeight: string;
  socket: any;
  challenges: any;
  tracker: any;

  constructor(
    public gameService: GamesService,
    public socketService: SocketService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.socket = this.socketService.socket;

    this.mapHeight = (window.screen.height - 48 - 28 - 60) + 'px';

    this.route.params.subscribe(params => (this.gameId = params.id));

    this.activatePositionTracker();
    // this.socket.on('getPositions', this.activatePositionTracker.bind(this));
    this.socket.on('usersPosition', this.addToUsersPosition.bind(this));

    this.gameService.getOne(this.gameId)
    .subscribe(game => {
      this.game = game;
      this.challenges = this.game.challenges;
      this.socketService.joinGameboard(this.game.title);
    });
  }

  addToUsersPosition(positions) {
    this.gameService.userPositions = positions;
    console.log(this.gameService.userPositions);
  }

  activatePositionTracker() {
    console.log('Activating User Position Tracker...');

    const options = {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 0
    };

    this.tracker = navigator.geolocation.watchPosition(this.sendPositionToBack.bind(this), this.errorTracker, options);
  }

  sendPositionToBack(pos) {
    const coords: LatLngLiteral = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    };

    const room = this.game.title;

    console.log(`> User is at: `, coords);
    this.socket.emit('position', coords, room);
  }

  errorTracker(err) {
    console.log(`Error: `, err);
  }

  ngOnDestroy() {
    navigator.geolocation.clearWatch(this.tracker);
  }
}
