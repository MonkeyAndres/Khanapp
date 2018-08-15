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

  tracker: any;
  userCoords: LatLngLiteral;

  challengeDialog: any;
  challenges: any;

  // Select gameboard map
  @ViewChild(GameareaViewerComponent) mapViewer: GameareaViewerComponent;

  constructor(
    public gameService: GamesService,
    public socketService: SocketService,
    public route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.socket = this.socketService.socket; // Store the socket.io Socket.

    // Calculate map height depends of screen size
    this.mapHeight = (window.screen.height - 48 - 28 - 60) + 'px';

    this.route.params.subscribe(params => {
      this.gameId = params.id;

      this.gameService.getOne(this.gameId)
      .subscribe(game => {
        this.game = game;
        this.challenges = this.game.challenges;

        // Notify the back that a new user joined the game.
        this.socketService.joinGameboard(this.game.title);

        this.activatePositionTracker();

        // Store the users positions that the backend send
        this.socket.on('usersPosition', this.addToUsersPosition.bind(this));

        // Detect when other users complete a challenge and update it, see backend for more.
        this.socket.on('updateChallenges', (challenges) => this.challenges = challenges);
      });
    });
  }

  addToUsersPosition(positions) {
    this.gameService.userPositions = positions;
    console.log(this.gameService.userPositions);

    // When the user position update...
    this.mapViewer.checkNearChallenges();
  }

  activatePositionTracker() {
    console.log('Activating User Position Tracker...');

    const options = {
        enableHighAccuracy: true,
        timeout: 8000, // Maximum time for calculating user position
        maximumAge: 0
    };

    // Watch the user position (see navigator.geolocation.watchPosition docs)
    this.tracker = navigator.geolocation.watchPosition(this.sendPositionToBack.bind(this), this.errorTracker, options);
  }

  // When the user changes his position send the position to backend.
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

  // When theres an error traking the user, print it in console.
  errorTracker(err) {
    console.log(`Error: `, err);
  }

  // Control the challenge dialog
  openChallenge(challengeId) {
    this.challengeDialog = this.dialog.open(ChallengeComponent, {
      width: '90%',
      data: {challengeId}
    });

    // When the dialog closes if result === true resolve challenge
    this.challengeDialog.afterClosed().subscribe(result => {
      if (result) {
        this.resolveChallenge(result);
      }
    });
  }

  resolveChallenge(challengeId) {
    // Emit Socket.io event (see backend for more)
    this.socket.emit('challengeCompleted', this.game, challengeId);
  }

  // When the component destroy stop traking user position.
  ngOnDestroy() {
    navigator.geolocation.clearWatch(this.tracker);
  }
}
