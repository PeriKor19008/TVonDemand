import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAddress } from './exports_for_services';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http:HttpClient) { }
  getAddress(customer_id:Number):Observable<IAddress>{
    return this.http.get<IAddress>("http://localhost:8090/profile/customer/address/"+customer_id);
  }
}
