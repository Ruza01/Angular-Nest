import { createReducer, on } from "@ngrx/store";
import { initialState } from "./profile.state";
import { getProfileImageSucces } from "./profile.action";



const _profileReducer = createReducer(initialState,
    on(getProfileImageSucces, (state, action) => {
        return{
            ...state,
            imageUrl: action.url
        }
    }),
)

export function ProfileReducer(state: any, action: any){
    return _profileReducer(state,action);
}

