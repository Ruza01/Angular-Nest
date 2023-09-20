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

@NgModule({
  declarations: [
    AppComponent,
    PlaylistComponent,
    SongThumbComponent,
    SongEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
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
