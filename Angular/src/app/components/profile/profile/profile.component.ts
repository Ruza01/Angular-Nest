import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addEmptyCar } from '../../car/state/car.action';
import { CarService } from '../../car/car.service';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  showContent: boolean = false;

  constructor(private carService: CarService, private store: Store<AppState>){

  }

  ngOnInit(): void {
    
  }
  
  addECar(){
    this.store.dispatch(addEmptyCar());
    this.showContent = true;
  }

}
