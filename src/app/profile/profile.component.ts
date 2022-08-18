import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public selectedId:any;
  public optionId:any;
  public userType:any;
  public userId:any;
  public userFirstName = new String;
  public userLastName = new String;
  public userEmail = new String;
  public userAddressId = new Number;
  public userActive = new Boolean;
  public userCreateDate = new String;
  public userViewType = new String;

  constructor(private _profileService:ProfileService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap) => {
      this.userType = String(params.get('type'));
      this.userId = Number(params.get('id'));
    });
    switch(this.userType)
    {
      case "Customer":
      {
        this._profileService.getCustomerProfile(this.userId).subscribe(data => {
          this.userFirstName = data.data[0].first_name;
          this.userLastName = data.data[0].last_name;
          this.userEmail = data.data[0].email; 
          this.userAddressId = data.data[0].address_id;
          this.userActive = data.data[0].active;
          this.userCreateDate = data.data[0].create_date;
          this.userViewType = data.data[0].view_type;
        });
        break;
      };
      case 'Employee':
      {
        this._profileService.getCustomerProfile(this.userId).subscribe(data => {
          this.userFirstName = data.data[0].first_name;
          this.userLastName = data.data[0].last_name;
          this.userEmail = data.data[0].email; 
          this.userAddressId = data.data[0].address_id;
          this.userActive = data.data[0].active;
          this.userCreateDate = data.data[0].create_date;
        });
        break;
      };
      case 'Administrator':
      {
        this._profileService.getCustomerProfile(this.userId).subscribe(data => {
          this.userFirstName = data.data[0].first_name;
          this.userLastName = data.data[0].last_name;
          this.userEmail = data.data[0].email; 
          this.userAddressId = data.data[0].address_id;
          this.userActive = data.data[0].active;
          this.userCreateDate = data.data[0].create_date;
        });
        break;
      };
    }
  }

  onSelect(option:any){

  }

  isSelected(option:any){
    return option === this.selectedId;
  }

  gotoInterface(){
    this.router.navigate(['/interface', {type: this.userType, id: this.userId}]);
  }
}