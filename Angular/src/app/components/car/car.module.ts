import { NgModule } from "@angular/core";
import { CarComponent } from "./car.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { EffectsModule } from "@ngrx/effects";
import { CarEffects } from "./state/car.effects";
import { StoreModule } from "@ngrx/store";
import { CarReducer } from "./state/car.reducer";
import { CAR_STATE_NAME } from "./state/car.selector";


@NgModule({
    declarations: [
        CarComponent,

    ],
    imports: [
        HttpClientModule,
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        FontAwesomeModule,
        EffectsModule.forFeature([CarEffects]),
        StoreModule.forFeature(CAR_STATE_NAME, CarReducer),
    ]
})

export class CarModule {}