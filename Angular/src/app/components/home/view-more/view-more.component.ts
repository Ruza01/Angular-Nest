import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Car } from 'src/app/Models/car.model';
import { selectAllCars, selectAllImages } from '../../car/state/car.selector';
import { getCars } from '../../car/state/car.action';

@Component({
  selector: 'app-view-more',
  templateUrl: './view-more.component.html',
  styleUrls: ['./view-more.component.css']
})
export class ViewMoreComponent implements OnInit {
  
  cars$: Observable<Car[]>;

  @Input() car: Car | undefined;
  @Input() showAdditionalContent = false;
  @Output() closeViewMore: EventEmitter<void> = new EventEmitter<void>();

  constructor(private store: Store){
    this.cars$ = this.store.select(selectAllCars);
  }
  
  stepBack1(){

  }

  stepForward1(){
    
  }

  ngOnInit(): void {
   
  }

  closeForm(){
    this.closeViewMore.emit();
  }
}
