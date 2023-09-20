import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Song } from '../models/songs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})

export class SongsService {

  constructor(private httpClient: HttpClient) { 

  }

  getAll() {
    return this.httpClient
      .get<Song[]>(environment.api + "/songs");
  }
}
