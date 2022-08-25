import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISerie } from './exports_for_services';

@Injectable({
  providedIn: 'root'
})
export class SerieService {

  constructor(private http:HttpClient) { }
  getSerie(id:Number):Observable<ISerie>{
    return this.http.get<ISerie>("http://localhost:8090/serie/"+id);
  }
}
