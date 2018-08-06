import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
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
import { GameListComponent } from './game/game-list/game-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateGameComponent } from './game/create-game/create-game.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { GameInfoComponent } from './game/game-info/game-info.component';
import { GameareaViewerComponent } from './maps/gamearea-viewer/gamearea-viewer.component';
import { GameareaDrawerComponent } from './maps/gamearea-drawer/gamearea-drawer.component';
import { FileUploadModule } from 'ng2-file-upload';
import { GameComponent } from './game/game.component';

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
    GameComponent,
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
      apiKey: 'AIzaSyCHzBSzavSY29YBL4mJE-oWbfPBdxluKYw',
      libraries: ['places', 'drawing', 'geometry'],
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
