import { createFeatureSelector, createSelector } from "@ngrx/store"
import { CarState } from "./car.state"


export const CAR_STATE_NAME = 'car';


export const selectCarState = createFeatureSelector<CarState>('car');

export const selectCarImages = createSelector(
  selectCarState,
  (state: CarState) => state.images
);