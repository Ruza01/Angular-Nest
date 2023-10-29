import { createAction, props } from "@ngrx/store";
import { AddCarDto } from "src/app/Dto/add-car.dto";
import { Car } from "src/app/Models/car.model";

export const addCar = createAction('Add Car', props<{ carDto: AddCarDto, carId: number }>() );
export const addCarSucces = createAction('Add Car Succes', props<{ car: Car }>() );

export const addCarImages = createAction('Add Car Image', props<{ files: any, id: number }>() );
export const addCarImagesSucces = createAction('Add Car Image Succes', props<{ imageUrls: string[] }>() );

export const addEmptyCar = createAction('Add empty car');
export const addEmptyCarSuccess = createAction('Add empty car success', props<{ newCarId:number }>() );

export const getCars = createAction('Get cars');
export const getCarsSuccess = createAction('Get cars success', props<{ cars: Car[] }>() );