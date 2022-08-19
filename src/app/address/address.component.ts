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

  constructor(private _addressService:AddressService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap) => {
      this.userType = String(params.get('type'));
      this.userId = Number(params.get('id'));
      this._addressService.getAddress(this.userId).subscribe(data => {
        this.address = data.data;
      });
    });
  }

  onSelect(option:any){

  }

  gotoProfile(){
    this.router.navigate(['/profile', {type: this.userType, id: this.userId}]);
  }
}
