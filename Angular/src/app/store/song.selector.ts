import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { Song } from "../models/songs";

export const selectSongFeature = createSelector(
    (state: AppState ) => state.songs,
    (songs) => songs
)

export const selectSongsIds = createSelector(
    selectSongFeature,      //krecemo od njega
    (songs) => songs.ids   
)

//
export const selectSongsList = createSelector(
    selectSongFeature,
    (songs) => songs.ids        
    .map(id => songs.entities[id])      // vratice niz entiteta,     OD ID-JEVA NAPRAVIMO OBJEKTE
    .filter(song => song !== null)      //ukoliko nije undefined ili null  
    .map((song) => <Song>song)          //kastuj ga u song
)

export const selectSelectedSongId = createSelector(
    selectSongFeature,                  //selektor
    (songs) => songs.selectedSong       //kako ce ta funkcija da radi
)

//kombinujem 2 selektora i ovim dobijamo da nam selektor vrati objekat selektovane pesme i to iskoriscavamo u song-editor.component.ts
export const selectSelectedSong = createSelector(
    selectSongFeature,        //dace mi spisak svih pesama
    selectSelectedSongId,   //dace mi id pesme
    (songs, songId) => songs.entities[songId]    //prolazim kroz listu i biram sta mi treba 
)