import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesService } from '../../services/games.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit {
  gameTitle = 'Game Info';
  gameId: string;
  game: any;

  alreadyJoined: boolean;
  owner: boolean;

  constructor(
    public route: ActivatedRoute,
    public gameService: GamesService,
    public auth: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
    // Get gameId from route params
    this.route.params.subscribe(params => {
      this.gameId = params.id;

      // Get the rest of game data
      this.gameService.getOne(this.gameId)
        .subscribe(game => {
          // I think that this doesn't need to be documented :)
          this.game = game;
          this.gameTitle = this.game.title;

          this.alreadyJoined = this.checkIfJoined();
          this.owner = this.checkIfOwner();
        });
    });
  }

  checkIfJoined(): boolean {
    let result = false;

    for (const player of this.game.players) {
      if (player.username === this.auth.user.username) {
        result = true;
        break;
      }
    }

    return result;
  }

  checkIfOwner(): boolean {
    return this.game.creator === this.auth.user._id;
  }

  deleteGame() {
    this.gameService.delete(this.gameId)
    .subscribe(data => {
      this.router.navigate(['/profile']);
    });
  }

  joinGame() {
    this.gameService.addPlayerToGame(this.auth.user._id, this.gameId)
    .subscribe(data => {
      this.router.navigate(['/profile']);
    });
  }
}
