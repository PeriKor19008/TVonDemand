import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICustomerProfile, ICustomers } from './exports_for_services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http:HttpClient) { }
  getCustomers():Observable<ICustomers>{
    return this.http.get<ICustomers>("http://localhost:8090/customers");
  }
}
