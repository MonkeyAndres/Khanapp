import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from '../auth/auth.component';
import { ProfileComponent } from '../profile/profile.component';

import { CanLogin, UserLogged } from './routing.guards';
import { GameInfoComponent } from '../game/game-info/game-info.component';

const routes: Routes = [
  {path: 'login', component: AuthComponent, canActivate: [CanLogin]},
  {path: 'signup', component: AuthComponent, canActivate: [CanLogin]},

  {path: 'profile', component: ProfileComponent, canActivate: [UserLogged]},
  {path: 'game/info/:id', component: GameInfoComponent, canActivate: [UserLogged]},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [ RouterModule ],
  declarations: [],
  providers: [ UserLogged, CanLogin ],
})
export class RoutingModule { }
