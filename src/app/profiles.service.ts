import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IFilms } from "./exports_for_services";
import { Observable } from "rxjs";
import {IProfiles} from "./exports_for_services";

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  constructor(private http:HttpClient) { }

  getProfiles():Observable<IProfiles>{

    return this.http.get<IProfiles>("http://localhost:8090/all_profiles");

  }
}

