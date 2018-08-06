import { Component, OnInit, ViewChild, NgZone, AfterContentInit, ElementRef } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, AfterContentInit {

  @ViewChild('search') searchElement: ElementRef;
  results: any;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public gameService: GamesService
  ) {}

  ngOnInit() { }

  ngAfterContentInit() {
    this.mapsAPILoader.load().then(
      () => {
        const autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: []});

        autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            const place: google.maps.places.PlaceResult = autocomplete.getPlace();

            if (place.geometry === undefined || place.geometry === null ) {
              return;
            }

            const latitude = place.geometry.location.lat();
            const longitude = place.geometry.location.lng();
            this.getNearGames({latitude, longitude});
          });
        });
      }
    );
  }

  geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.getNearGames(position.coords);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  getNearGames(coords) {
    this.results = null;
    this.gameService.findNear(coords)
      .subscribe(data => {
        console.log(data);
        this.results = data;
      });
  }
}
