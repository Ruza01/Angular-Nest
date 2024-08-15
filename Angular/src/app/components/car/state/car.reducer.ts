import { createReducer, on } from "@ngrx/store";
import { CarState, initialState } from "./car.state";
import { addCar, addCarImages, addCarSucces, deleteCarSucces, getCars, getCarsByStanjeSuccess, getCarsSuccess } from "./car.action";


const _carReducer = createReducer(initialState,
    // on(addCar, (state, { carDto }) => ({
    //     ...state,
    //     cars: [...state.cars, carDto],  //dodaje novi auto na postojecu listu
    //   })),
      on(addCarSucces, (state, car) => ({
        ...state,
        cars: [...state.cars, car],
        error: null,
      })),
      on(addCarImages, (state, { images }) => ({
        ...state,
        images,
      })),
      //on(getCars, state => ({ ...state })),
      on(getCarsSuccess, (state, { cars }) => ({
      ...state, // zadrzi sve podatke koji nisu izmenjeni, samo pregazi cars i images
      cars,
      images: cars.flatMap(car => car.images) //skupi sve slike svih automobila u jedan niz
      })),
      on(getCarsByStanjeSuccess, (state, { cars }) => ({
        ...state,
        cars,
        })),
      on(deleteCarSucces, (state, { carId }) => ({
        ...state,
        cars: state.cars.filter(car => car.id !== carId)
      }))

    
)

export function CarReducer(state: CarState | undefined, action: any){
    return _carReducer(state,action);
}