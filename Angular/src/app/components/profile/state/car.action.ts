import { SafeUrl } from "@angular/platform-browser";
import { createAction, props } from "@ngrx/store";
import { AddCarDto } from "src/app/Dto/add-car.dto";
import { Car } from "src/app/Models/car.model";

export const addCar = createAction('Add Car', props<{ carDto: AddCarDto, carId: number }>() );
export const addCarSucces = createAction('Add Car Succes', props<{ car: Car }>() );

export const addCarImages = createAction('Add Car Image', props<{ files: any, id: number }>() );
export const addCarImagesSucces = createAction('Add Car Image Succes', props<{ imageUrls: string[] }>() );

//====================================================================================================================

export const getProfileImagee = createAction('[profile page] get profile image start', props<{ id: number | undefined }>() );
export const getProfileImageSucces = createAction('[profile page] get profile image succes', props<{ url: SafeUrl }>() );

export const uploadProfileImage = createAction('[profile page] upload profile image', props<{ id: number | undefined, file: File}>() );

