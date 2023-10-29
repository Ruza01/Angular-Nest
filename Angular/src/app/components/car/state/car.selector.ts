import { createFeatureSelector, createSelector } from "@ngrx/store"
import { CarState, carAdapter } from "./car.state"


export const CAR_STATE_NAME = 'car';

const getCarState = createFeatureSelector<CarState>(CAR_STATE_NAME);
export const carSelectors = carAdapter.getSelectors();

export const selectCars = createSelector(getCarState, carSelectors.selectAll);
export const selectNewCarId = createSelector(getCarState, state => state.newCarId);
export const selectNewCarImages = createSelector(getCarState, state => state.newCarImageUrls);

export const selectCarById = createSelector(getCarState, (state: CarState, props: any) => {
    return state.entities[props.id];
})