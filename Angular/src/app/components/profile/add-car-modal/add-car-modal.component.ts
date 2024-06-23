import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Store } from '@ngrx/store';
import { addCar, addCarImages, addEmptyCar, getCars } from '../../car/state/car.action';
import { selectNewCarId, selectNewCarImages } from '../../car/state/car.selector';
import { CarService } from '../../car/car.service';
import { AppState } from 'src/app/store/app.state';
import { AddCarDto } from 'src/app/Dto/add-car.dto';
import { getUserId } from '../../user-auth/state/auth.selector';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  carForm : FormGroup = new FormGroup({
    stanje: new FormControl('',Validators.required),
    marka: new FormControl('',Validators.required),
    model: new FormControl('',Validators.required),
    godiste: new FormControl('',Validators.required),
    kilometraza: new FormControl('',Validators.required),
    karoserija: new FormControl('',Validators.required),
    gorivo: new FormControl('',Validators.required),
    kubikaza: new FormControl('',Validators.required),
    snagaMotora: new FormControl('',Validators.required),
    cena: new FormControl('',Validators.required),
    fiksnaCena: new FormControl('',Validators.required),
    zamena: new FormControl('',Validators.required), 
  })

  constructor(private profileService: ProfileService, private store: Store<AppState>,
     private carService: CarService, private fb: FormBuilder, private snackBar: MatSnackBar){
 
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

  addCar() {
    if (this.carForm.valid) {
      const carDto: AddCarDto = this.carForm.value;

      this.store.select(getUserId).subscribe(userID => {
        carDto.userId = userID;
        this.store.dispatch(addCar({ carDto }));
      });

      this.snackBar.open('Uspešno ste postavili oglas!', 'Zatvori', {
        duration: 7000,
      });
    } else {
      this.snackBar.open('Morate popuniti sva polja i dodati slike!', 'Zatvori', {
        duration: 7000,
      });
    }
  }
}

