import { Injectable } from "@angular/core";
import { createEffect, Actions , ofType} from "@ngrx/effects";
import * as SongActions from './song.action';
import { catchError, map, mergeMap, of } from "rxjs";
import { SongsService } from "../services/songs.service";

@Injectable()           //videce se u root modulu
export class SongsEffects {
    
    constructor(private actions$: Actions,private songService: SongsService){     //tok akcija koje se dispecuju
    }

    //ovim se pretplacujemo na tok koji dispecer daje
    loadSongs$ = createEffect(() => 
        this.actions$.pipe(
            ofType(SongActions.loadSongs),          //filtriraj samo one koje su loadSongs
            mergeMap(() =>                          //mora mergeMap ili switchMap jer zelim da predjem na drugi tok i da vratim drugi tok
                this.songService.getAll().pipe(     //poziv apija (niz pesama) i samo trebamo jos da vratimo drugu akciju (to je ona Succes)
                    map((songs) => SongActions.loadSongsSuccess({ songs: songs})),
                    catchError(() => of({ type: 'load error'}))
                )         
            )                     
        )
    );
}