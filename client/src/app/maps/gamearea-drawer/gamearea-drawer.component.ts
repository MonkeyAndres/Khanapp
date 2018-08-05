import { Component, ViewChild, OnInit, AfterContentInit } from '@angular/core';
import { Element } from '@angular/compiler';
import {} from '@types/googlemaps';
import { LatLngLiteral } from '@agm/core';

@Component({
  selector: 'app-gamearea-drawer',
  templateUrl: './gamearea-drawer.component.html',
  styleUrls: ['./gamearea-drawer.component.scss']
})
export class GameareaDrawerComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  completed = false;
  data: any;
  middle: any = {
    type: 'Point',
    coordinate: [],
  };

  ngOnInit() {
    this.map = new google.maps.Map(this.gmapElement.nativeElement, {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });

    const drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.MARKER,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ['polygon']
      },
      circleOptions: {
        fillColor: '#ffff00',
        fillOpacity: 1,
        strokeWeight: 5,
        clickable: false,
        editable: true,
        zIndex: 1
      }
    });
    drawingManager.setMap(this.map);

    google.maps.event.addListener(drawingManager, 'polygoncomplete', this.polygonGetPaths.bind(this));
  }

  pathsToGeoJson(polygonPaths) {
    const geoJson = {
      type: 'Polygon',
      coordinates: []
    };

    polygonPaths.forEach((xy, i) => {
      const lat = xy.lat();
      const lng = xy.lng();

      geoJson.coordinates.push([lng, lat]);
    });

    return geoJson;
  }

  polygonGetPaths(polygon) {
    const polygonPaths = polygon.getPaths().b[0].b;
    this.data = this.pathsToGeoJson(polygonPaths);
    const middleCoords = this.getMiddle(this.data.coordinates);
    this.middle.coordinates = middleCoords;
    this.completed = true;
  }

  getMiddle(coordinates) {
    const LNG = 0;
    const LAT = 1;

    let maxLatPoint = coordinates[0];
    let minLatPoint = coordinates[0];

    let maxLngPoint = coordinates[0];
    let minLngPoint = coordinates[0];

    for (const coord of coordinates) {
      if (coord[LAT] > maxLatPoint[LAT]) {
        maxLatPoint = coord;
      }
      if (coord[LAT] < minLatPoint[LAT]) {
        minLatPoint = coord;
      }
      if (coord[LNG] < maxLngPoint[LNG]) {
        maxLngPoint = coord;
      }
      if (coord[LNG] > minLatPoint[LNG]) {
        minLngPoint = coord;
      }
    }

    const middleLng = (maxLngPoint[LNG] + minLngPoint[LNG]) / 2;
    const middleLat = (maxLatPoint[LAT] + minLatPoint[LAT]) / 2;

    return [ middleLng, middleLat ];
  }

  constructor() {}
}
