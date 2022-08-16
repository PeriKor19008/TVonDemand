import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ILogin } from "./login";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http:HttpClient) { }
  getLogin(email:string,):Observable<ILogin>{
    return this.http.get<ILogin>("http://localhost:8090/login/"+email);
  }
}
