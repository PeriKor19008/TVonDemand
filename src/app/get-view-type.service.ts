import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGetViewType } from './exports_for_services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetViewTypeService {

  constructor(private http:HttpClient) { }
  getViewType(id:number):Observable<IGetViewType>
  {
    return this.http.get<IGetViewType>("http://localhost:8090/get/view_type/"+id);
  }
}