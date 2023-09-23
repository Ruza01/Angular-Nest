import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.css']
})


export class ProfileDataComponent {
    value1 = 'Name';
    value2 = 'Surname';
    value3 = 'Username';
    value4 = 'Email';
}