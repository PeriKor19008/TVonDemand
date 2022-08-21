import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUpdate } from './exports_for_services';

@Injectable({
  providedIn: 'root'
})
export class EditDbService {

  constructor(private http:HttpClient) { }
  editTables(table:String, column:String, value:String, where:String, condvalue:String):Observable<IUpdate>{
    console.log("http://localhost:8090/" + table + "/" + column + "/" + value + "/" + where + "/" + condvalue);
    return this.http.get<IUpdate>("http://localhost:8090/update/" + table + "/" + column + "/" + value + "/" + where + "/" + condvalue);
  }
}
