import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEpisodes } from './exports_for_services';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {

  constructor(private http:HttpClient) { }
  getEpisodes(season_id:Number):Observable<IEpisodes>{
    return this.http.get<IEpisodes>("http://localhost:8090/episodes_available/"+season_id);
  }
}
