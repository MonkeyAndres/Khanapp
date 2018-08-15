import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LatLngLiteral } from '@agm/core';
import { GamesService } from '../../services/games.service';
import { AuthService } from '../../services/auth.service';

import genCircle from '@turf/circle';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';

@Component({
  selector: 'app-gamearea-viewer',
  templateUrl: './gamearea-viewer.component.html',
  styleUrls: ['./gamearea-viewer.component.scss']
})
export class GameareaViewerComponent implements OnInit {

  @Input() challenges;
  @Input() gameAreaCoords;
  @Input() middlePoint;
  @Input() mapHeight = '270px';
  @Input() mapZoom = 14;

  @Output() openChallengeDialog = new EventEmitter<any>();

  middle: any;
  coordinates: Array<LatLngLiteral>;
  userPosition: LatLngLiteral;
  radius = 20;

  constructor(
    public gameService: GamesService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.middle = this.toLatLngLiteral(this.middlePoint);
    this.coordinates = this.toLatLngLiteral(this.gameAreaCoords);
  }

  // Transform a GeoJSON into a LatLng, needs refactor.
  toLatLngLiteral(geoJson): any {
    const LNG = 0;
    const LAT = 1;
    const result: Array<LatLngLiteral> = [];

    if (geoJson.length === 2) {
      return {lng: geoJson[LNG], lat: geoJson[LAT]};
    }

    for (const coord of geoJson) {
      result.push({lng: coord[LNG][0], lat: coord[LAT][0]});
    }

    return result;
  }

  checkNearChallenges() {
    const username = this.auth.user.username; // Store username

    // Search for the position of the user in gameService property
    this.userPosition = this.gameService.userPositions[username];

    if (this.userPosition) {
      const center = [this.userPosition.lng, this.userPosition.lat]; // Define the center of the circle.
      const options = {steps: 10, units: 'kilometers'}; // Circle options (see turf/circle for more)
      const circle = genCircle(center, this.radius / 1000, options); // Generate a polygon around the user.

      // For each challenge check if the user is near to someone
      for (const challenge of this.challenges) {
        const result = booleanPointInPolygon(challenge.position, circle); // (See turf/booleanPointInPolygon)
        challenge.active = result; // Activate the challenge or deactivate it
      }
    } else {
      console.log('Theres no user.'); // For avoid errors
    }
  }

  // Execute the openChallenge() in gameboard component
  openChallenge(id) { this.openChallengeDialog.emit(id); }
}
