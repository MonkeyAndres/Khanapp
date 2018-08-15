import { Component, OnInit, AfterContentInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-find-game',
  templateUrl: './find-game.component.html',
  styleUrls: ['./find-game.component.scss']
})
export class FindGameComponent implements OnInit, AfterContentInit {
  @ViewChild('search') searchElement: ElementRef; // Select the HTML search box

  results: any;
  message: string;
  query: string;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    // private ngZone: NgZone,
    public gameService: GamesService
  ) {}

  ngOnInit() { }

  ngAfterContentInit() {
    this.mapsAPILoader.load() // Init the GoogleMapsApiLoader (see AGM docs for more)
    .then(() => {
        // Register the search input as a google maps autocomplete input.
        const autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: []});

        autocomplete.addListener('place_changed', () => {
          // this.ngZone.run(() => {
            const place: google.maps.places.PlaceResult = autocomplete.getPlace(); // Get the selected place.

            if (place.geometry === undefined || place.geometry === null ) {
              return;
            }

            // Select lat and lng
            const latitude = place.geometry.location.lat();
            const longitude = place.geometry.location.lng();
            this.getNearGames({latitude, longitude}); // Search for near game passing the lat and lng
          // });
        });
      }
    );
  }

  // If the user clicks the geolocate button...
  geolocate() {
    // Check if browser supports geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.getNearGames(position.coords); // Call get near games with actual coords.
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  // Search for near games
  getNearGames(coords) {
    this.results = null; // Reset the results.

    this.gameService.findNear(coords) // Find near games (see the gameService for more)
    .subscribe((data: Array<any>) => {
      if (data.length > 0) { // If more than 0 results
        this.results = data; // Add results to result arr
        this.message = ''; // Clear error message
      } else {
        this.message = 'There\'s no khanas near to you.'; // Else show error message
      }
    });
  }
}
