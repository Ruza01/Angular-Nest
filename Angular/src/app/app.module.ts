import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule }  from '@angular/common/http';
import {StoreDevtoolsModule} from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ProfileModule } from './components/profile/profile.module';
import { UserAuthModule } from './components/user-auth/user-auth.module';
import { StoreModule } from '@ngrx/store';
import { HomeModule } from './components/home/home.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { appReducer } from './store/app.state';
import { CarComponent } from './components/car/car.component';
import { CarEffects } from './components/car/state/car.effects';
import { ProfileEffects } from './components/profile/state/profile.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    ProfileModule,
    UserAuthModule,
    EffectsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    HomeModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, 
      logOnly: !isDevMode(), 
      autoPause: true, 
      trace: false, 
      traceLimit: 75, 
    }),
    EffectsModule.forRoot([CarEffects,ProfileEffects]),
    StoreModule.forRoot(appReducer),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
