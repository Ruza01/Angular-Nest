import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Store } from '@ngrx/store';
import { addCar, addCarImages, addEmptyCar, getCars } from '../../car/state/car.action';
import { selectNewCarId, selectNewCarImages } from '../../car/state/car.selector';
import { CarService } from '../../car/car.service';
import { AppState } from 'src/app/store/app.state';
import { AddCarDto } from 'src/app/Dto/add-car.dto';
import { getUserId } from '../../user-auth/state/auth.selector';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-car-modal',
  templateUrl: './add-car-modal.component.html',
  styleUrls: ['./add-car-modal.component.css']
})
export class AddCarModalComponent implements OnInit{

  value1 = 'Stanje';
  value2 = 'Marka';
  value3 = 'Model';
  value4 = 'Godiste';
  value5 = 'Kilometraza';
  value6 = 'Karoserija';
  value7 = 'Gorivo';
  value8 = 'Kubikaza';
  value9 = 'Snaga motora';
  value10 = 'Cena';
  value11 = 'Fiksna cena';
  value12 = 'Zamena';
  imageUrl: string[] = [];
  carForm!: FormGroup;

  constructor(private profileService: ProfileService, private store: Store<AppState>,
     private carService: CarService, private fb: FormBuilder){
      
      this.carForm = fb.group({
        stanje: [''],
        marka: [''],
        model: [''],
        godiste: [0],
        kilometraza: [0],
        karoserija: [''],
        gorivo: [''],
        kubikaza: [0],
        snagaMotora: [0],
        cena: [''],
        fiksnaCena: [''],
        zamena: [''],
      })
  }

  ngOnInit(): void {
    //this.store.select(selectNewCarImages).subscribe(images => this.imageUrl = images);
  }


  stepBack(){

  }

  stepForward(){
      
  }

  addPhotos(event: Event){
    const files = (<HTMLInputElement>event.target).files;
    if(files){
      this.store.dispatch(getCars());
      const primitiveFileList: File[] = Array.from(files);
      console.log(primitiveFileList);
      let id: number = -1;
      this.store.select(selectNewCarId).subscribe(value => id = value);
      //this.carService.uploadImages(files, id).subscribe(res => console.log(res));
      this.store.dispatch(addCarImages({ files: primitiveFileList, id }))
    }
  }

  addCar(){
    let carId: number = -1;
    let userId: number = -1;
    const carDto: AddCarDto = this.carForm.value;

    this.store.select(selectNewCarId).subscribe(val => carId = val);
    this.store.select(getUserId).subscribe((val) => userId = val);

    carDto.userId = userId;
    this.store.dispatch(addCar({ carDto, carId}));
    console.log("dddd");
  }

}
