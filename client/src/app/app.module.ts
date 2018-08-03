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
import { GameListComponent } from './profile/game-list/game-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateGameComponent } from './profile/create-game/create-game.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { GameInfoComponent } from './game-info/game-info.component';
import { GameareaViewerComponent } from './game-info/gamearea-viewer/gamearea-viewer.component';

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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCHzBSzavSY29YBL4mJE-oWbfPBdxluKYw'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
