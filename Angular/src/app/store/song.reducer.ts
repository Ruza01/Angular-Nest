import { createReducer, on} from "@ngrx/store";
import {Song} from "../models/songs";
import * as Actions from './song.action';
import { state } from "@angular/animations";
import { EntityState, createEntityAdapter } from "@ngrx/entity";


//reducer uzima akciju, i nesto ce da uradi sa trenutnim stanjem

export interface SongsState extends EntityState<Song> {
    selectedSong: number;
}

const adapter = createEntityAdapter<Song>();

export const initialState: SongsState = adapter.getInitialState({
    selectedSong: 0
})

//kad neko posalje akciju, on ce da kaze ko je selektovao pesmu i ja cu u reduceru da uhvatim tu akciju,da iscupam taj
//parametar {songId} i da ga dodelim state-u selectedSong: songId,
export const songsReducer = createReducer(
    initialState,
    on(Actions.selectSong, (state, {songId}) => {       
        //vraca novi objekat koji sa svim propertijima koji je imao state i pregazi postojeci(azurira) ukoliko navedemo isti, a doda novi ukoliko taj properti ne postoji u objektu
        return {
            ...state, //rasturi objekat
            selectedSong: songId, //pregazi postojeci
        };
    }),
    on(Actions.loadSongsSuccess, (state, {songs}) => 
        adapter.setAll(songs,state)
    ),
    on(Actions.rateSong, (state, {songId, rating}) =>      //songId i rating su parametri iz song.actions.ts
       adapter.updateOne(
        {
            id: songId,
            changes: {
                rating, //propertiji koji su se promenili
            },
        },
        state
        )
    )
)





//ovo je distrakcering  
// const {selectedSong} = initialState;
// selectedSong......