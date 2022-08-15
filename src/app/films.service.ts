import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Films} from "./film";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  constructor(private http:HttpClient) { }

  getFilms():Observable<Films>{

    return this.http.get<Films>("http://localhost:8090/films");

  }
}
