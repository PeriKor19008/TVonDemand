import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILanuguage } from './exports_for_services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  constructor(private http:HttpClient) { }
  getLanguage(language_id:Number):Observable<ILanuguage>{
    return this.http.get<ILanuguage>("http://localhost:8090/language/"+language_id);
  }
}
