import { Component } from '@angular/core';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.css']
})
export class CarCardComponent {

  showAdditionalContent: boolean = false;

  value1 = 'Naziv';
  value2 = 'Cena';
  value3 = 'Godiste';

  toggleContent(){
    this.showAdditionalContent = true;
  }

  closeAdditionalContent(){
    this.showAdditionalContent = false;
  }

}
