import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addCar, addCarImages, addCarImagesSuccess, addCarSucces, addEmptyCar, addEmptyCarSuccess } from "./car.action";
import { exhaustMap, map, mergeMap } from "rxjs";
import { Store } from "@ngrx/store";
import { DomSanitizer } from "@angular/platform-browser";
import { CarService } from "../car.service";
import { Car } from "src/app/Models/car.model";
import { selectNewCarImages } from "./car.selector";
import { AppState } from "src/app/store/app.state";


@Injectable()
export class CarEffects {

    constructor(private actions$: Actions, private store: Store<AppState>, private carService: CarService, private sanitizer: DomSanitizer){
        
    }

    addCarImages$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(addCarImages),
            mergeMap( action => this.carService.uploadImages(action.files, action.id).pipe(
                mergeMap(() => {
                    return this.carService.getPhotosById(action.id).pipe(
                        map((photos: any) => {          //phoyos je objekat koji sadrzi podtke od slikama koje su preuzete sa servera
                            const imageUrls: string[] = [];
                            photos.data.forEach((photo: any) => {   //prolazi kroz sve slike.Svaka foto je objekat koji sadrzi data polje koje predstavlja binarne podatke slike
                                const values = photo.data.map((value: any) => parseInt(value,10)); //za svaku sliku, binarni podaci se mapiraju i konvertuju u niz brojeva
                                const imageData = new Uint8Array(values);   //nakon sto se izvrsi 27 linija koristi se Uint8Array konstruktor da se stvori objekat imageData
                                const blob = new Blob([imageData], { type: 'image/png'});   //Zatim se koristi Blob konstruktor da bi se stvorio blob objekat koji predstavlja sliku.Blob je JavaScript objekat koji predstavlja binarne podatke,u ovom slucaju sliku u formtu png
                                imageUrls.push(URL.createObjectURL(blob));  //stvaramo jedinstven url za taj blob objekat.Taj url se dodaje u niz imageUrls, cime se cuva url slike
                            })
                            return addCarImagesSuccess({imageUrls});
                        })
                    )
                })
            ))
        )
    })

    
    emptyCar$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(addEmptyCar),
            exhaustMap(action => this.carService.addEmptyCar().pipe(
                map((car: any) => addEmptyCarSuccess({ newCarId: car.id }))
            ))
        )
    })

    addCar$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(addCar),
            exhaustMap(action => this.carService.addCar(action.carDto).pipe(
                map((car: any) => {
                    let imageUrls: string[] = [];
                    //this.store.select(selectNewCarImages).subscribe(images => imageUrls = images);
                    const carObj: Car = {
                        id: car.id,
                        stanje: car.stanje,
                        marka: car.marka,
                        model: car.model,
                        godiste: car.godiste,
                        kilometraza: car.kilometraza,
                        karoserija: car.karoserija,
                        gorivo: car.gorivo,
                        kubikaza: car.kubikaza,
                        snagaMotora: car.snagaMotora,
                        cena: car.cena,
                        fiksnaCena: car.fiksnaCena,
                        zamena: car.zamena,
                        imageUrls: imageUrls
                    }
                    return addCarSucces({ car: carObj })
                }) 
            ))
        )
    })




    
}