import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProfileService } from "../profile.service";
import { getProfileImagee, getProfileImageSucces, uploadProfileImage } from "./profile.action";
import { exhaustMap, map, mergeMap } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";


@Injectable()
export class ProfileEffects {

    constructor(private actions$: Actions,private profileService: ProfileService, private sanitizer: DomSanitizer){
        
    }

    profileImage$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getProfileImagee),
            exhaustMap(action => this.profileService.getProfileImage(action.id)
                .pipe(
                    map( blob => {
                        let objectUrl = URL.createObjectURL(blob);  //pravimo objekat od tog blob-a (koji predstavlja sliku u binarnom formatu dobijenog od servera)
                        let url = this.sanitizer.bypassSecurityTrustUrl(objectUrl); //objekat prolazi kroz domSanitizer servis, tacnije kroz njegocu metodu by.. (radi sigurnostii bezbednosti i manje problema i gresaka)
                        return getProfileImageSucces({url})
                    })
                ))
        )
    })

    uploadProfileImage$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(uploadProfileImage),
            exhaustMap(action => this.profileService.uploadImage(action.id, action.file)
                .pipe(
                map(blob => {
                    let objectUrl = URL.createObjectURL(blob);
                    let url = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
                    return getProfileImageSucces({url});
                })
            ))
        )
    })
}