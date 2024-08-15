import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from './store/app.state';
import { Store } from '@ngrx/store';
import { getErrorMsg, getLoading } from './store/shared/shared.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  title = 'Polovni Automobili';
  showLoading!: Observable<boolean>;
  errorMsg!: Observable<string>;
  
  constructor(private store: Store<AppState>){
  }

  ngOnInit(): void{
    this.showLoading = this.store.select(getLoading); //pretplacujemo se na promene odredjenog dela stanja.Pristupamo trenutnoj vrdnosti dela stanje, ali ne menjamo stanje
    this.errorMsg = this.store.select(getErrorMsg);
  }


}
