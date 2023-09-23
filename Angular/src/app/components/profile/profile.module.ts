import { CommonModule, NgIf } from "@angular/common";
import { ProfileDataComponent } from "./profile-data/profile-data.component";
import { ProfileImageComponent } from "./profile-image/profile-image.component";
import { ProfileComponent } from "./profile/profile.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatTabsModule } from "@angular/material/tabs";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { AddCarImageComponent } from "./add-car-image/add-car-image.component";
import { AddCarModalComponent } from './add-car-modal/add-car-modal.component';

@NgModule({
    declarations: [
      ProfileComponent,
      ProfileImageComponent,
      ProfileDataComponent,
      AddCarImageComponent,
      AddCarModalComponent
    ],
    imports: [
      CommonModule,
      FontAwesomeModule,
      FormsModule,
      ReactiveFormsModule,
      MatToolbarModule,
      MatIconModule,
      MatMenuModule,
      MatTabsModule,
      MatButtonToggleModule,
      FontAwesomeModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      NgIf,
      MatButtonModule,
      
    ]
})

export class ProfileModule { }