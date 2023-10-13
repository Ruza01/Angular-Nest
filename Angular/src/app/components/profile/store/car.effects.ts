import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AppState } from "src/app/app.state";
import { ProfileService } from "../profile.service";
import { Store } from "@ngrx/store";
import { addCar, addCarImages, addCarImagesSucces } from "./car.action";
import { map, mergeMap } from "rxjs";
import { create } from "domain";


@Injectable()
export class CarEffects {

    constructor(private actions$: Actions, private store: Store<AppState>, private profileService: ProfileService ){
        
    }

    addCarImages$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(addCarImages),
            mergeMap( action => this.profileService.uploadImages(action.files, action.id).pipe(
                mergeMap(() => {
                    return this.profileService.getPhotosById(action.id).pipe(
                        map((photos: any) => {          //phoyos je objekat koji sadrzi podtke od slikama koje su preuzete sa servera
                            const imageUrls: string[] = [];
                            photos.data.forEach((photo: any) => {   //prolazi kroz sve slike.Svaka foto je objekat koji sadrzi data polje koje predstavlja binarne podatke slike
                                const values = photo.data.map((value: any) => parseInt(value,10)); //za svaku sliku, binarni podaci se mapiraju i konvertuju u niz brojeva
                                const imageData = new Uint8Array(values);   //nakon sto se izvrsi 27 linija koristi se Uint8Array konstruktor da se stvori objekat imageData
                                const blob = new Blob([imageData], { type: 'image/png'});   //Zatim se koristi Blob konstruktor da bi se stvorio blob objekat koji predstavlja sliku.Blob je JavaScript objekat koji predstavlja binarne podatke,u ovom slucaju sliku u formtu png
                                imageUrls.push(URL.createObjectURL(blob));  //stvaramo jedinstven url za taj blob objekat.Taj url se dodaje u niz imageUrls, cime se cuva url slike
                            })
                            return addCarImagesSucces({imageUrls});
                        })
                    )
                })
            ))
        )
    })
}