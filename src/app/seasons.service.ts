import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISeasons } from './exports_for_services';

@Injectable({
  providedIn: 'root'
})
export class SeasonsService {

  constructor(private http:HttpClient) { }
   getSeasons(serie_id:Number):Observable<ISeasons>{
    return this.http.get<ISeasons>("http://localhost:8090/seasons_available/"+serie_id);
  }
}
