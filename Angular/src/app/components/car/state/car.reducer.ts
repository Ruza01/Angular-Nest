import { createReducer, on } from "@ngrx/store";
import { initialState } from "./car.state";
import { addCar, addCarImages, addCarSucces } from "./car.action";


const _carReducer = createReducer(initialState,
    on(addCar, (state, { carDto }) => ({
        ...state,
        cars: [...state.cars, carDto],
      })),
      on(addCarSucces, state => ({
        ...state,
        error: null,
      })),
      on(addCarImages, (state, { images }) => ({
        ...state,
        images,
      }))
    
)

export function CarReducer(state: any, action: any){
    return _carReducer(state,action);
}