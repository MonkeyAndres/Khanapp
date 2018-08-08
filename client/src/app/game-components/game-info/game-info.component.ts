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
    this.route.params.subscribe(params => {
      this.gameId = params.id;
      this.gameService.getOne(this.gameId)
        .subscribe(game => {
          this.game = game;
          this.alreadyJoined = this.checkIfJoined();
          this.owner = this.checkIfOwner();
        });
    });
  }

  checkIfJoined(): boolean {
    let result = false;

    this.game.players.forEach(element => {
      if (element.username === this.auth.user.username) {
        result = true;
      }
    });

    return result;
  }

  checkIfOwner(): boolean {
    let result = false;

    if (this.game.creator === this.auth.user._id) {
      result = true;
    }

    return result;
  }

  deleteGame() {
    this.gameService.delete(this.gameId)
      .subscribe(data => {
        this.router.navigate(['/profile']);
      });
  }

  joinGame() {
    console.log('join');
  }
}
