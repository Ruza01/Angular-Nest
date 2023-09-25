import { createAction,props } from "@ngrx/store";
import { Song, SongRating } from "../Models/songs";

export const loadSongs = createAction('Load Songs');   

export const loadSongsSuccess = createAction(
    'Load Songs Success',
    props<{ songs: Song[] }>()
)

export const selectSong = createAction(
    'Select a Song',
    props<{songId: number}>()  //ovde moze i niz parametara songId: number, param: string...
);

export const rateSong = createAction(
    'Rate a song',
    props<{ songId: number, rating: SongRating }>()
);