import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { HttpClientModule }  from '@angular/common/http';
import { SongThumbComponent } from './components/song-thumb/song-thumb.component';
import { SongEditorComponent } from './components/song-editor/song-editor.component';
import { StoreModule } from '@ngrx/store';
import { songsReducer } from './store/song.reducer';
import { AppState } from './app.state';
import {StoreDevtoolsModule} from '@ngrx/store-devtools'
import { SongsEffects } from './store/song.effects';
import { EffectsModule } from '@ngrx/effects';
import { HeaderComponent } from './components/home/header/header.component';
import { FooterComponent } from './components/home/footer/footer.component';
import { BodyComponent } from './components/home/body/body.component';
import { HomeComponent } from './components/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ProfileModule } from './components/profile/profile.module';

@NgModule({
  declarations: [
    AppComponent,
    PlaylistComponent,
    SongThumbComponent,
    SongEditorComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    ProfileModule,
    StoreModule.forRoot<AppState>({songs: songsReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, 
      logOnly: !isDevMode(), 
      autoPause: true, 
      trace: false, 
      traceLimit: 75, 
    }),
    EffectsModule.forRoot([SongsEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
