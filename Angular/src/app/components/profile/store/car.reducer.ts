import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createReducer , on } from "@ngrx/store";
import { Car } from "src/app/Models/car.model";
import * as Actions from "./car.action";


export interface CarState extends EntityState<Car>{
    newCarId: number,
    newCarImageUrls: string[]
}

const adapter = createEntityAdapter<Car>();

export const initialState: CarState = adapter.getInitialState({
    newCarId: -1,
    newCarImageUrls: ["../../../assets/noCarImage/no-image-available.webp"]
})

const carReducer = createReducer(initialState,
    on(Actions.addCarSucces, (state, action) => {
        adapter.addOne(action.car, state);
        return {
            ...state,
            newCarImageUrls: ["../../../assets/noCarImage/no-image-available.webp"]
        }
    }),
    on(Actions.addCarImagesSucces, (state, action) => {
        return {
            ...state,
            newCarImageUrls: action.imageUrls
        }
    })
)

