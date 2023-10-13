import { createAction, props } from "@ngrx/store";
import { AddCarDto } from "src/app/Dto/add-car.dto";
import { Car } from "src/app/Models/car.model";

export const addCar = createAction('Add Car', props<{ carDto: AddCarDto, carId: number }>() );
export const addCarSucces = createAction('Add Car Succes', props<{ car: Car }>() );

export const addCarImages = createAction('Add Car Image', props<{ files: any, id: number }>() );
export const addCarImagesSucces = createAction('Add Car Image Succes', props<{ imageUrls: string[] }>() );

