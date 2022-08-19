import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IFilms } from "./exports_for_services";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  constructor(private http:HttpClient) { }

  getFilms():Observable<IFilms>{

    return this.http.get<IFilms>("http://localhost:8090/films_available");

  }
}