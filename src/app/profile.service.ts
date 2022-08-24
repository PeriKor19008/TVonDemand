import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAdministratorProfile, ICustomerProfile, IEmployeeProfile } from './exports_for_services';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }

  getCustomerProfile(id:Number)
  {
    return this.http.get<ICustomerProfile>("http://localhost:8090/profile/customer/"+id);
  }

  getEmployeeProfile(id:Number)
  {
    return this.http.get<IEmployeeProfile>("http://localhost:8090/profile/employee/"+id);
  }

  getAdministratorProfile(id:Number)
  {
    return this.http.get<IAdministratorProfile>("http://localhost:8090/profile/administrator/"+id);
  }
}
