import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  public userType = new String;
  public userId = new Number;
  public addressId = new Number;
  public address:any;
  public getId = new Number;

  constructor(private _addressService:AddressService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap) => {
      this.userType = String(params.get('type'));
      this.userId = Number(params.get('id'));
      this.getId = Number(params.get('customer_id'));
      switch(this.userType)
      {
        case 'Customer':
        {
          this._addressService.getAddress(this.userId).subscribe(data => {
            this.address = data.data;
          });
          break;
        }
        case 'Employee':
        {
          this._addressService.getAddress(this.getId).subscribe(data => {
            this.address = data.data;
          });
          break;
        }
      }
    });
  }

  onSelect(option:any){

  }

  gotoProfile(){
    switch(this.userType)
    {
      case 'Customer':
      {
        this.router.navigate(['../profile', {type: this.userType, id: this.userId}], {relativeTo: this.route});
        break;
      }
      case 'Employee':
      {
        this.router.navigate(['../profile', {type: this.userType, id: this.userId, customer_id: this.getId}], {relativeTo: this.route});
        break;
      }
    }
  }
}
