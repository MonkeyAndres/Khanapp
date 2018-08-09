import { environment } from '../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './router/routing.module';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ProfileComponent } from './profile/profile.component';
import { InfoComponent } from './profile/info/info.component';
import { GameListComponent } from './game-components/game-list/game-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateGameComponent } from './game-components/create-game/create-game.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { GameInfoComponent } from './game-components/game-info/game-info.component';
import { GameareaViewerComponent } from './maps/gamearea-viewer/gamearea-viewer.component';
import { GameareaDrawerComponent } from './maps/gamearea-drawer/gamearea-drawer.component';
import { FileUploadModule } from 'ng2-file-upload';
import { FindGameComponent } from './game-components/find-game/find-game.component';
import { MykhanasComponent } from './mykhanas/mykhanas.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { ChallengeMultipleComponent } from './challenge/challenge-multiple/challenge-multiple.component';

const MAPS_API_KEY = environment.MAPS_API_KEY;

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ProfileComponent,
    InfoComponent,
    GameListComponent,
    NavbarComponent,
    CreateGameComponent,
    EditProfileComponent,
    GameInfoComponent,
    GameareaViewerComponent,
    GameareaDrawerComponent,
    FindGameComponent,
    MykhanasComponent,
    GameboardComponent,
    ChallengeComponent,
    ChallengeMultipleComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FileUploadModule,
    AgmCoreModule.forRoot({
      apiKey: MAPS_API_KEY,
      libraries: ['places', 'drawing', 'geometry'],
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
