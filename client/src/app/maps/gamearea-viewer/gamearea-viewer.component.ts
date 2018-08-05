import { Component, OnInit, Input } from '@angular/core';
import { LatLngLiteral } from '@agm/core';

@Component({
  selector: 'app-gamearea-viewer',
  templateUrl: './gamearea-viewer.component.html',
  styleUrls: ['./gamearea-viewer.component.scss']
})
export class GameareaViewerComponent implements OnInit {

  @Input() coordinates;
  @Input() middlePoint: LatLngLiteral;
  boundPoints: Array<LatLngLiteral>;

  constructor() { }

  ngOnInit() {
  }
}

