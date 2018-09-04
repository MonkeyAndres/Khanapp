import { Component, ViewChild, OnInit } from '@angular/core';
import { Element } from '@angular/compiler';
import { MapsAPILoader } from '@agm/core';
import {} from 'googlemaps'; // Ignore the error.

@Component({
  selector: 'app-gamearea-drawer',
  templateUrl: './gamearea-drawer.component.html',
  styleUrls: ['./gamearea-drawer.component.scss']
})
export class GameareaDrawerComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any; // Select the map container

  map: google.maps.Map; // Define a property map type Google Map

  completed = false;
  data: any;

  middle: any = {
    type: 'Point',
    coordinate: [],
  };

  constructor(private mapsAPILoader: MapsAPILoader) {}

  ngOnInit() {
    this.mapsAPILoader.load() // Init the GoogleMapsApiLoader (see AGM docs for more)
    .then(() => {
      // Get Current Position
      navigator.geolocation.getCurrentPosition(
        this.getPositionsFromEvent.bind(this), // Success callback
        this.createDrawingTools.bind(this) // Error callback
      );
    });
  }

  getPositionsFromEvent(position) {
    // Store position in constants
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    this.createDrawingTools(lat, lng);
  }

  createDrawingTools(err, lat = 0, lng = 0) {

    // Change the zoom if can't get current position
    let zoom = 12;
    if (err) { zoom = 2; }

    // Initialize the map
    this.map = new google.maps.Map(this.gmapElement.nativeElement, {
      center: {lat, lng},
      streetViewControl: false,
      mapTypeControl: false,
      gestureHandling: 'greedy',
      zoom,
    });

    // Initiazile drawing tools google (google maps docs for more)
    const drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: [google.maps.drawing.OverlayType.POLYGON]
      }
    });
    drawingManager.setMap(this.map); // Put the drawing tools in the map

    // When the polygon is completed...
    google.maps.event.addListener(drawingManager, 'polygoncomplete', this.polygonGetPaths.bind(this));
  }

  // Converts from LatLng to GeoJSON
  pathsToGeoJson(polygonPaths) {
    const geoJson = {
      type: 'Polygon',
      coordinates: []
    };

    polygonPaths.forEach((xy) => {
      const lat = xy.lat();
      const lng = xy.lng();

      geoJson.coordinates.push([lng, lat]);
    });

    return geoJson;
  }

  // Extract the paths of the polygon and set the polygon to complete.
  polygonGetPaths(polygon) {
    const polygonPaths = polygon.getPaths().b[0].b;
    this.data = this.pathsToGeoJson(polygonPaths);

    const middleCoords = this.getMiddle(this.data.coordinates);
    this.middle.coordinates = middleCoords;

    this.completed = true;
  }

  // Get Middle point of polygon, needs a refactor...
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
}
