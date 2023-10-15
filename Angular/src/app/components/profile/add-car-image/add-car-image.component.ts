import { Component } from '@angular/core';
import { Car } from 'src/app/Models/car.model';
import { ProfileService } from '../profile.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { addCarImages } from '../state/car.action';

@Component({
  selector: 'app-add-car-image',
  templateUrl: './add-car-image.component.html',
  styleUrls: ['./add-car-image.component.css']
})
export class AddCarImageComponent {

  cars!: Car[];

  constructor(private profileService: ProfileService, private store: Store<AppState>){

  }

  ngOnInit(): void{
    
  }

  addPhotos(event: Event){
    const files = (<HTMLInputElement>event.target).files;
    if(files){
      
      const primitiveFileList: File[] = Array.from(files);
      let id: number = -1;
      //this.store.select(selectNewPlantId).subscribe(value => id = value);
      this.store.dispatch(addCarImages({ files: primitiveFileList, id}));
    }
  }
} 
