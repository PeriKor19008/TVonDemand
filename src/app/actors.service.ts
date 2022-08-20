import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IActors } from './exports_for_services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {

  constructor(private http:HttpClient) { }

  getFilmActors(film_id:Number):Observable<IActors>{
    return this.http.get<IActors>("http://localhost:8090/film/actors/"+film_id);
  }

  getSerieActors(serie_id:Number):Observable<IActors>{
    return this.http.get<IActors>("http://localhost:8090/serie/actors/"+serie_id);
  }
}
