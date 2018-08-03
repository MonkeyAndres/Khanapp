import { Component, OnInit, Input } from '@angular/core';
import { LatLngLiteral } from '@agm/core';

@Component({
  selector: 'app-gamearea-viewer',
  templateUrl: './gamearea-viewer.component.html',
  styleUrls: ['./gamearea-viewer.component.scss']
})
export class GameareaViewerComponent implements OnInit {

  @Input() coordinates;
  middle: LatLngLiteral;
  boundPoints: Array<LatLngLiteral>;

  constructor() { }

  ngOnInit() {
    this.getBoundPoints();
  }

  getBoundPoints() {
    let maxLatPoint = this.coordinates[0];
    let minLatPoint = this.coordinates[0];

    let maxLngPoint = this.coordinates[0];
    let minLngPoint = this.coordinates[0];

    for (const coord of this.coordinates) {
      if (coord.lat > maxLatPoint.lat) {
        maxLatPoint = coord;
      }
      if (coord.lat < minLatPoint.lat) {
        minLatPoint = coord;
      }
      if (coord.lng < maxLngPoint.lng) {
        maxLngPoint = coord;
      }
      if (coord.lng > minLatPoint.lng) {
        minLngPoint = coord;
      }
    }

    this.boundPoints = [maxLatPoint, maxLngPoint, minLatPoint, minLngPoint];
    this.middle = {
      lat: (maxLatPoint.lat + minLatPoint.lat) / 2,
      lng: (maxLngPoint.lng + minLngPoint.lng) / 2
    };
  }
}

