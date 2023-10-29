import { SafeUrl } from "@angular/platform-browser";
import { createAction, props } from "@ngrx/store";


export const getProfileImagee = createAction('[profile page] get profile image start', props<{ id: number | undefined }>() );
export const getProfileImageSucces = createAction('[profile page] get profile image succes', props<{ url: SafeUrl }>() );

export const uploadProfileImage = createAction('[profile page] upload profile image', props<{ id: number | undefined, file: File}>() );

