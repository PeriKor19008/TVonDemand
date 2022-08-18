import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFilm } from './exports_for_services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(private http:HttpClient) { }
  getFilm(id:Number):Observable<IFilm>{
    return this.http.get<IFilm>("http://localhost:8090/film/"+id);
  }
}
