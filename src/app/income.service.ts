import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IIncome } from './exports_for_services';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http:HttpClient) { }
  getIncome():Observable<IIncome>{
    return this.http.get<IIncome>("http://localhost:8090/income");
  }
}
