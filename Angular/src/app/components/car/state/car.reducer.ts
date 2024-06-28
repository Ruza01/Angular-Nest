import { createReducer, on } from "@ngrx/store";
import { CarState, initialState } from "./car.state";
import { addCar, addCarImages, addCarSucces, deleteCarSucces, getCars, getCarsSuccess } from "./car.action";


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
      })),
      on(getCars, state => ({ ...state })),
      on(getCarsSuccess, (state, { cars }) => ({
      ...state,
      cars,
      images: cars.flatMap(car => car.images) 
      })),
      on(deleteCarSucces, (state, { carId }) => ({
        ...state,
        cars: state.cars.filter(car => car.id !== carId)
      }))

    
)

export function CarReducer(state: CarState | undefined, action: any){
    return _carReducer(state,action);
}