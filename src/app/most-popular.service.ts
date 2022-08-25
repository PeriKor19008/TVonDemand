import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMostPopular } from './exports_for_services';

@Injectable({
  providedIn: 'root'
})
export class MostPopularService {

  constructor(private http:HttpClient) { }
  getMostPopularFilms()
  {
    return this.http.get<IMostPopular>("http://localhost:8090/most_popular/films");
  }
  getMostPopularSeries()
  {
    return this.http.get<IMostPopular>("http://localhost:8090/most_popular/series");
  }
}
