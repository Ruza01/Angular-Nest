import { Component , OnInit } from '@angular/core';
import { Song } from 'src/app/Models/songs';
import { SongsService } from 'src/app/services/songs.service';
import { Observable, of} from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AppModule } from 'src/app/app.module';
import { SongsState } from 'src/app/store/song.reducer';
import { Store } from '@ngrx/store';
import { loadSongs, selectSong } from 'src/app/store/song.action';
import { AppState } from 'src/app/app.state';
import { selectSongsList } from 'src/app/store/song.selector';


@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  song$: Observable<Song[]> = of([]);

  title = "Mnogo dobre pesme";

  constructor(private store: Store<AppState>) {
    
  }

  ngOnInit(): void {
    this.store.dispatch(loadSongs());
    this.song$ = this.store.select(/*state => state.songs.lsit*/ selectSongsList);
    //this.song$ = this.songService.getAll();
         
  }

  //u playlisti kada iz songThumb-a mi posalje event da je selektovao pesmu, on ce da pozove u playlisti selectedSong i znace koja je pesma
  //kliknuta i onda ce da uhvati stor i ima njegov dispatch koji ce da dispecuje akciju, koju akciju? Pa ja sam izabrao da to bude selectSong
  //i zato mu prosledjujem kao argument objekat koji ima songId i njega postavljam na song.id
  selectSong(song: Song){
    this.store.dispatch(selectSong({
      songId: song.id
    }))
  }
 

}
