import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addCar, addCarImages, addCarSucces, deleteCar, deleteCarSucces, getCars, getCarsByStanje, getCarsByStanjeSuccess, getCarsSuccess } from "./car.action";
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
                map((car: any) => { //kada se doda auto u bazu, rezultat se mapira na novu akciju
                    const imageUrls: any[] = action.carDto.images;
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
                        images: imageUrls
                    }
                    return addCarSucces({ car: carObj })  //vraca novu akciju koju uhvati reducer
                }) 
            ))
        )
    })

    getCars$ = createEffect(() =>
        this.actions$.pipe(
          ofType(getCars),
          mergeMap(() => this.carService.getCars().pipe(   //operator koji obezbedjuje da se svaka nova akcija getCars pokrene, cak i ako je prethodni getCars API poziv jos u toku
              map((cars: Car[]) => getCarsSuccess({ cars })), //ako je rezultat apija uspesan, lista automobila se mapira na akciju getCarsSuccess
              catchError(() => of({ type: 'Get cars failed' })) 
            )
          )
        )
      );
      
      getCars1$ = createEffect(() =>
        this.actions$.pipe(
          ofType(getCarsByStanje),
          mergeMap( action => this.carService.getCarsByStanje(action.stanje).pipe(   
              map((cars: Car[]) => getCarsByStanjeSuccess({ cars })), 
              catchError(() => of({ type: 'Get cars failed' })) 
            )
          )
        )
      );

      deleteCar$ = createEffect(() => 
        this.actions$.pipe(
          ofType(deleteCar),
          mergeMap(action => 
            this.carService.deleteCar(action.carId).pipe(
              map(() => deleteCarSucces({ carId: action.carId }))
            )
          )
        )
      )




    
}