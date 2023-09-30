import { Component } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  isButtonClicked: boolean = false;
  clickedButtonIndex: number = -1;

  performAction(index: number){
    this.clickedButtonIndex = index;
    switch(index){
      case 1:
        this.performAction1();
      break;
      case 2:
        this.performAction2();
      break;
      case 3:
        this.performAction3();
      break;
      case 4:
        this.performAction4();
      break;
      case 5:
        this.performAction5();
      break;
      case 6:
        this.performAction6();
      break;
      case 7:
        this.performAction7();
      break;
      case 8:
        this.performAction8();
      break;
      case 9:
        this.performAction9();
      break;

    }
  }

  performAction1() {
    // Implementirajte željenu akciju koja će se desiti kada korisnik klikne na dugme "Done"
    // Na primer: pozovite neku funkciju ili izvršite neki kod ovde
    this.isButtonClicked = true; 
  }

  performAction2() {

    this.isButtonClicked = true; 
  }

  performAction3() {

    this.isButtonClicked = true; 
  }

  performAction4() {

    this.isButtonClicked = true; 
  }

  performAction5() {

    this.isButtonClicked = true; 
  }

  performAction6() {

    this.isButtonClicked = true; 
  }

  performAction7() {

    this.isButtonClicked = true; 
  }

  performAction8() {

    this.isButtonClicked = true; 
  }

  performAction9() {

    this.isButtonClicked = true; 
  }
}
