import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  @Input() games: Array<any>;
  @Input() type: string;

  constructor() { }

  ngOnInit() {
  }
}
