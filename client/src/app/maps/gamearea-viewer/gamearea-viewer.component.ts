import { LatLngLiteral } from '@agm/core';
import { Component, OnInit, Input } from '@angular/core';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-gamearea-viewer',
  templateUrl: './gamearea-viewer.component.html',
  styleUrls: ['./gamearea-viewer.component.scss']
})
export class GameareaViewerComponent implements OnInit {

  @Input() gameAreaCoords;
  @Input() middlePoint;
  @Input() mapHeight = '270px';

  middle: any;
  coordinates: Array<LatLngLiteral>;

  constructor(public gameService: GamesService) { }

  ngOnInit() {
    this.middle = this.toLatLngLiteral(this.middlePoint);
    this.coordinates = this.toLatLngLiteral(this.gameAreaCoords);
  }

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
}
