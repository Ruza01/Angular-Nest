import { Component , OnInit} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/Models/user.model';
import { getUser } from '../../user-auth/state/auth.selector';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.css']
})


export class ProfileDataComponent implements OnInit {
    
  value1 = 'Name';
  value2 = 'Surname';
  value3 = 'Username';
  value4 = 'Email';
  user$!: Observable<User | null>;

  constructor(private store: Store<AppState>){
  }

  ngOnInit(): void {
    this.user$ = this.store.select(getUser);
  }

}