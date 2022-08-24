import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { EditDbService } from '../edit-db.service';
import { ProfileService } from '../profile.service';

declare function autoEnter(elementName:String, buttonName:String):any;

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
  public customerId = new Number;
  public customerFirstName = new String;
  public customerLastName = new String;
  public customerEmail = new String;
  public customerAddressId = new Number;
  public customerActive = new Boolean;
  public customerCreateDate = new String;
  public customerViewType = new String;
  public enableEdit = false;
  public editSelection = new String;
  public update:any;
  public updated = false;
  public getId = new Number;

  public editEntries: any[] = ['customer_id', 'email', 'first_name', 'last_name', 'address_id', 'active', 'view_type'];

  constructor(private _profileService:ProfileService, private _editDbService:EditDbService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap) => {
      this.userType = String(params.get('type'));
      this.userId = Number(params.get('id'));
      this.getId = Number(params.get('customer_id'));
      switch(this.userType)
      {
        case 'Customer':
        {
          this._profileService.getCustomerProfile(this.userId).subscribe(data => {
            this.customerId = data.data[0].customer_id;
            this.customerFirstName = data.data[0].first_name;
            this.customerLastName = data.data[0].last_name;
            this.customerEmail = data.data[0].email; 
            this.customerAddressId = data.data[0].address_id;
            this.customerActive = data.data[0].active;
            this.customerCreateDate = data.data[0].create_date;
            this.customerViewType = data.data[0].view_type;
          });
          break;
        }
        case 'Employee':
        {
          this._profileService.getCustomerProfile(this.getId).subscribe(data => {
            this.customerId = data.data[0].customer_id;
            this.customerFirstName = data.data[0].first_name;
            this.customerLastName = data.data[0].last_name;
            this.customerEmail = data.data[0].email; 
            this.customerAddressId = data.data[0].address_id;
            this.customerActive = data.data[0].active;
            this.customerCreateDate = data.data[0].create_date;
            this.customerViewType = data.data[0].view_type;
          });
          break;
        }
      }
    });
  }

  isSelected(option:any){
    return option === this.selectedId;
  }

  gotoCustomers(){
    this.router.navigate(['../customers', {type: this.userType, id: this.userId}], {relativeTo: this.route});
  }

  gotoRentals(){
    this.router.navigate(['../cart', {type: this.userType, id: this.userId, get_type: String(this.customerViewType), customer_id: this.getId}], {relativeTo: this.route})
  }

  showAddress(){
    if(this.userType == 'Customer')
      this.router.navigate(['../address', {type: this.userType, id: this.userId}], {relativeTo: this.route});
    else 
      this.router.navigate(['../address', {type: this.userType, id: this.userId, customer_id: this.customerId}], {relativeTo: this.route});
  }

  onChange(event:any)
  {
    this.editSelection = String(event.value);
  }

  submit(value:string)
  {
    if(this.userType == 'Customer')
    {
      this._editDbService.editTables("customer", this.editSelection, value, "customer_id", this.userId).subscribe(data => {
        this.update=data.data;
        this.updated = true;
      });
    }
    else
    {
      this._editDbService.editTables("customer", this.editSelection, value, "customer_id", String(this.getId)).subscribe(data => {
        this.update=data.data;
        this.updated = true;
      });
    }
  }

  enable_edit()
  {
    this.enableEdit = true;
    setTimeout(function(){autoEnter("valueTextField", "submitButton")}, 1000);
  }
}