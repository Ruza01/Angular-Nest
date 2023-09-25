import { Injectable } from "@angular/core";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { loginStart, loginSuccess, signupStart, signupSuccess } from "./auth.actions";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { UserAuthService } from "../user-auth.service";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { AppState } from "../../store/app.state";
import { setErrorMessage, setLoadingSpinner } from "../../store/shared/shared.actions";

@Injectable()
export class AuthEffects{
    constructor(
        private actions$: Actions,
        private authService: UserAuthService, 
        private store: Store<AppState>,
        private router:Router) {

    }
    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginStart),
            exhaustMap((action) => {
                return this.authService.login(action.email, action.password)
                .pipe(
                    exhaustMap(data => {
                        return this.authService.getUserWithToken(data)
                                    .pipe(
                                        map(user => {
                                            this.store.dispatch(setLoadingSpinner({status:false}));
                                            return loginSuccess({user});
                                        })
                                    )
                    }),
                    catchError(error => {
                        this.store.dispatch(setLoadingSpinner({status:false}));
                        return of(setErrorMessage({errorMsg:error.error.message}));
                    })
                );
            })
        )
    })

    loginRedirect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(...[loginSuccess, signupSuccess]),
            tap(action => {
                this.store.dispatch(setErrorMessage({errorMsg:""}));
                this.router.navigate(['/']);
            })
        )
    }, {dispatch: false});

    signup$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(signupStart),
            exhaustMap(action => this.authService.signupUser(action.signupDto)
                .pipe(
                map(user => {
                    this.store.dispatch(setLoadingSpinner({status:false}));
                    return signupSuccess({user})
                }),
                catchError(error => {
                    this.store.dispatch(setLoadingSpinner({status:false}));
                    return of(setErrorMessage({errorMsg:error.error.message}));
                }) 
            ))
        )
    })
}