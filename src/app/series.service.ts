import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISeries } from './exports_for_services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  constructor(private http:HttpClient) { }
  getSeries():Observable<ISeries>{
    return this.http.get<ISeries>("http://localhost:8090/series");
  }
}
