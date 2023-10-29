import { createReducer, on } from "@ngrx/store";
import { carAdapter, initialState } from "./car.state";
import { addCarImagesSucces, addCarSucces, addEmptyCar, addEmptyCarSuccess } from "./car.action";


const _carReducer = createReducer(initialState,
    on(addEmptyCarSuccess, (state, action) => {
       return{
            ...state,
            newCarId: action.newCarId
       }
    }),
    on(addCarSucces, (state, action) => {
        carAdapter.addOne(action.car, state);
        return{
            ...state,
            newCarImageUrls: ["../../../assets/noCarImage/no-image-available.webp"]
        }
    }),
    on(addCarImagesSucces, (state, action) => {
        return{
            ...state,
            newCarImageUrls: action.imageUrls
        }
    })
    
)

export function CarReducer(state: any, action: any){
    return _carReducer(state,action);
}