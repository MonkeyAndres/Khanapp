import { Component, OnInit, AfterContentInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-find-game',
  templateUrl: './find-game.component.html',
  styleUrls: ['./find-game.component.scss']
})
export class FindGameComponent implements OnInit, AfterContentInit {

  @ViewChild('search') searchElement: ElementRef;
  results: any;
  message: string;

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
      .subscribe((data: Array<any>) => {
        if (data.length > 0) {
          this.results = data;
          this.message = '';
        } else {
          this.message = 'There\'s no khanas near to you.';
        }
      });
  }
}
