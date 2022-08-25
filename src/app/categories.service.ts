import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategories } from './exports_for_services';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http:HttpClient) { }

  getFilmCategories(film_id:Number):Observable<ICategories>{
    return this.http.get<ICategories>("http://localhost:8090/film/categories/"+film_id);
  }

  getSerieCategories(serie_id:Number):Observable<ICategories>{
    return this.http.get<ICategories>("http://localhost:8090/serie/categories/"+serie_id);
  }
}
