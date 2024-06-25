import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addCar, addCarImages, addCarSucces, getCars, getCarsSuccess } from "./car.action";
import { catchError, exhaustMap, map, mergeMap, of } from "rxjs";
import { Store } from "@ngrx/store";
import { DomSanitizer } from "@angular/platform-browser";
import { CarService } from "../car.service";
import { Car } from "src/app/Models/car.model";
import { AppState } from "src/app/store/app.state";


@Injectable()
export class CarEffects {

    constructor(private actions$: Actions, private store: Store<AppState>, private carService: CarService, private sanitizer: DomSanitizer){
        
    }

    addCar$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(addCar),
            exhaustMap(action => this.carService.addCar(action.carDto).pipe(
                map((car: any) => {
                    const imageUrls: string[] = action.carDto.images;
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
                        slike: imageUrls
                    }
                    return addCarSucces({ car: carObj })
                }) 
            ))
        )
    })

    getCars$ = createEffect(() =>
        this.actions$.pipe(
          ofType(getCars),
          mergeMap(() =>
            this.carService.getCars().pipe(
              map((cars: Car[]) => getCarsSuccess({ cars })),
              catchError(() => of({ type: 'Get cars failed' })) 
            )
          )
        )
      );




    
}