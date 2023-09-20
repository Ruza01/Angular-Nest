import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Song, SongRating } from 'src/app/models/songs';
import { Store } from '@ngrx/store';
import { SongsState } from 'src/app/store/song.reducer';
import { AppState } from 'src/app/app.state'
import { selectSelectedSong, selectSelectedSongId, selectSongFeature } from 'src/app/store/song.selector';
import { rateSong } from 'src/app/store/song.action';

@Component({
  selector: 'app-song-editor',
  templateUrl: './song-editor.component.html',
  styleUrls: ['./song-editor.component.css']
})
export class SongEditorComponent implements OnInit{ 

  //@Input() song: Song | null = null; <=> ovim od 14 do 23 linije

  private _song: Song | null = null;

  @Input()
  set song(value){
    this._song = value;
    if(value?.link)
    {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + value?.link)
    };
  }

  get song() {
    return this._song;
  }

  videoUrl: SafeUrl = {};

  constructor(private sanitizer: DomSanitizer, private store: Store<AppState>) {  //preko DI injectujem u komponente 
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/F4tHL8reNCs");
    //ovde se poziva seter 
    this.song = {
      id: 2,
      title: "Johny Johny Yes Papa",
      artist: "Looloo Kids",
      viewsCount: 6.27,
      link: "F4tHL8reNCs",
      rating: SongRating.None
    };
  }

  //pravim pretplatu, da ova komponenta gleda promenu stanja apk, i kad god se promeni,zelim da mi updatuje lokalnu promenljivu selectedSong na onu iz state-a(globalnog stanja)(tako sam uvek up do date)
  ngOnInit(): void {
    this.store.select(selectSelectedSong).subscribe((song) => {
      if(song){
        this.song = song;
      }
    })

  }

  selectSong(song: Song){
    console.log("Selektovana pesma je ", song);
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + song.link);
  }

  rating(): string {
    if(this.song){
      switch(this.song.rating){
        case SongRating.Like:
          return "+";
        case SongRating.Dislike:
          return "-";
        default:
          return '';
      }
    }else{
      return "";
    }
  }

  like(){
    if(this.song){
      this.store.dispatch(
        rateSong({
          songId: this.song.id,
           rating: SongRating.Like
        })
      );
    }
  }

  dislike(){
    if(this.song){
      this.store.dispatch(
        rateSong({
          songId: this.song.id,
           rating: SongRating.Dislike
        })
      );
    }
  }
  

}
