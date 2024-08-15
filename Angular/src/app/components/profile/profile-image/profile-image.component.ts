import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { User } from 'src/app/Models/user.model';
import { ProfileService } from '../profile.service';
import { Store } from '@ngrx/store';
import { getUser, getUserId } from '../../user-auth/state/auth.selector';
import { getProfileImage } from '../state/profile.selector';
import { getProfileImagee, uploadProfileImage } from '../state/profile.action';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.css']
})
export class ProfileImageComponent implements OnInit {
  
  imageUrl!: Observable<SafeUrl>;
  id!: number | undefined;
  user!: Observable<User | null >;

  constructor(private profileService: ProfileService, private store: Store<AppState>){
    this.store.select(getUserId).subscribe(id => this.id = id);   //prati ako dodje do promene neke i odmah se izvrsi ako bude promene
    this.store.dispatch(getProfileImagee({ id: this.id }));       
  }

  ngOnInit(): void {
    this.imageUrl = this.store.select(getProfileImage); 
    this.user = this.store.select(getUser);
  }

  uploadImage(event: Event){
    const inputFile = <HTMLInputElement>(event.target); 
    if(inputFile.files != null){   
      let file = inputFile?.files[0];
      this.store.dispatch(uploadProfileImage({ id: this.id, file }));  
    }
  }


}
