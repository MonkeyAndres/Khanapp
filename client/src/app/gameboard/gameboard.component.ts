import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { LatLngLiteral } from '@agm/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { GamesService } from '../services/games.service';
import { GameareaViewerComponent } from './../maps/gamearea-viewer/gamearea-viewer.component';
import { ChallengeComponent } from './../challenge/challenge.component';
import { SocketService } from '../services/socket.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss']
})
export class GameboardComponent implements OnInit, OnDestroy {
  gameId: string;
  game: any;
  mapHeight: string;
  socket: SocketIOClient.Socket;
  challenges: any;
  tracker: any;
  userCoords: LatLngLiteral;

  challengeDialog: any;

  @ViewChild(GameareaViewerComponent) mapViewer: GameareaViewerComponent;

  constructor(
    public gameService: GamesService,
    public socketService: SocketService,
    public route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.socket = this.socketService.socket;

    this.mapHeight = (window.screen.height - 48 - 28 - 60) + 'px';

    this.route.params.subscribe(params => (this.gameId = params.id));

    this.activatePositionTracker();

    this.socket.on('usersPosition', this.addToUsersPosition.bind(this));
    this.socket.on('updateChallenges', (challenges) => this.challenges = challenges);

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
    this.mapViewer.checkNearChallenges();
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

    this.userCoords = coords;
    console.log(`> User is at: `, coords);
    this.socket.emit('position', coords, room);
  }

  errorTracker(err) {
    console.log(`Error: `, err);
  }

  openChallenge(challengeId) {
    this.challengeDialog = this.dialog.open(ChallengeComponent, {
      width: '90%',
      data: {challengeId}
    });

    this.challengeDialog.afterClosed().subscribe(result => {
      if (result) {
        this.resolveChallenge(result);
      }
    });
  }

  resolveChallenge(challengeId) {
    this.socket.emit('challengeCompleted', this.game, challengeId);
  }

  ngOnDestroy() {
    navigator.geolocation.clearWatch(this.tracker);
  }
}
