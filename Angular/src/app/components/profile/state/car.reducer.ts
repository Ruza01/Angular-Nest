import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createReducer , on } from "@ngrx/store";
import { Car } from "src/app/Models/car.model";
import * as Actions from "./car.action";
import { SafeUrl } from "@angular/platform-browser";
import { initialState } from "./car.state";


export interface CarState extends EntityState<Car>{
    newCarId: number,
    newCarImageUrls: string[]
}

const adapter = createEntityAdapter<Car>();

export const initialState1: CarState = adapter.getInitialState({
    newCarId: -1,
    newCarImageUrls: ["../../../assets/noCarImage/no-image-available.webp"]
})

const carReducer = createReducer(initialState1,
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

const _profileReducer = createReducer(initialState,
    on(Actions.getProfileImageSucces, (state, action) => {
        return{
            ...state,
            imageUrl: action.url
        }
    }),
)

export function ProfileReducer(state: any, action: any){
    return _profileReducer(state,action);
}

