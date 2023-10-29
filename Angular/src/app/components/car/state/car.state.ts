import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Car } from "src/app/Models/car.model";


export interface CarState extends EntityState<Car>{
    newCarId: number,
    newCarImageUrls: string[]
}

export const carAdapter = createEntityAdapter<Car>();

export const initialState: CarState = carAdapter.getInitialState({
    newCarId: -1,
    newCarImageUrls: ["../../../assets/noCarImage/no-image-available.webp"]
})