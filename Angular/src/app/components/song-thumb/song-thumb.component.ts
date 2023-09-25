import { Component,EventEmitter,Input,OnInit, Output } from '@angular/core';
import { Song } from 'src/app/Models/songs';

@Component({
  selector: 'app-song-thumb',
  templateUrl: './song-thumb.component.html',
  styleUrls: ['./song-thumb.component.css']
})

export class SongThumbComponent implements OnInit {

  @Input() song: Song | null = null;
  @Output() onClick: EventEmitter<Song> = new EventEmitter<Song>();

  constructor() {}

  ngOnInit(): void {
      
  }

  clicked(){
    if(this.song){
      this.onClick.emit(this.song);
      
    }
  }

}
