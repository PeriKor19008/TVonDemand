import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { GetViewTypeService } from '../get-view-type.service';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent implements OnInit {

  public customerOptions = [
    {"option_id":1, "name": "Profile"},
    {"option_id":2, "name": "Rent Film"},
    {"option_id":3, "name": "Rent Serie"},
    {"option_id":4, "name": "Shopping Cart and Checkout"},
    {"option_id":5, "name": "Log Out"}
  ];

  public employeeOptions = [
    {"option_id":1, "name": "View Customer Profiles"},
    {"option_id":2, "name": "View Customer Rentals"},
    {"option_id":3, "name": "Update Database"},
    {"option_id":4, "name": "Show Most Popular Listings"},
    {"option_id":5, "name": "Log Out"}
  ];

  public administratorOptions = [
    {"option_id":1, "name": "Manage Accounts"},
    {"option_id":2, "name": "Show Total Profits"},
    {"option_id":3, "name": "Change Prices"},
    {"option_id":4, "name": "Log Out"}
  ];

  public numbering = 0;
  public selectedId:any;
  public userType = new String;
  public userId:any;
  public customerViewType:any;

  constructor(private router:Router, private route:ActivatedRoute, private _getViewTypeService:GetViewTypeService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap) => {
      this.userType = String(params.get('type'));
      this.userId = Number(params.get('id'));
    })
    if(this.userType == "Customer")
    {
      console.log(this.userId)
      this._getViewTypeService.getViewType(this.userId).subscribe(data => {
        this.customerViewType = data.data[0].view_type;
      });
      this.router.navigate(['profile', {type: this.userType, id: this.userId}], {relativeTo: this.route});
    }
    else if(this.userType == "Employee")
    {
      this.router.navigate(['customers', {type: this.userType, id: this.userId}], {relativeTo: this.route});
    }
  }

  onSelect(option:any){
    switch(this.userType)
    {
      case 'Customer':
      {
        switch(option)
        {
          case 1:
          {
            this.router.navigate(['profile', {type: this.userType, id: this.userId}], {relativeTo: this.route});
            break;
          }
          case 2:
          {
            this.router.navigate(['films', {type: this.userType, id: this.userId}], {relativeTo: this.route});
            break;
          }
          case 3:
          {
            this.router.navigate(['series', {type: this.userType, id: this.userId}], {relativeTo: this.route});
            break;
          }
          case 4:
          {
            this.router.navigate(['cart', {type: this.userType, id: this.userId}], {relativeTo: this.route});
            break;
          }
          case 5:
          {
            this.router.navigate(['..'], {relativeTo: this.route});
            break;
          }
        }
      }
      break;
      case 'Employee':
      {
        switch(option)
        {
          case 1:
          {
            this.router.navigate(['customers', {type: this.userType, id: this.userId}], {relativeTo: this.route});
            break;
          }
          case 2:
          {
            break;
          }
          case 3:
          {
            break;
          }
          case 4:
          {
            break;
          }
          case 5:
          {
            this.router.navigate(['/login']);
            break;
          }
        }
      }
      break;
      case 'Administrator':
      {
        switch(option)
        {
          case 1:
          {
            break;
          }
          case 2:
          {
            break;
          }
          case 3:
          {
            break;
          }
          case 4:
          {
            this.router.navigate(['/login']);
            break;
          }
        }
      }
      break;
    }
  }

  isSelected(option:any){
    return option.id === this.selectedId;
  }

  increment(numbering:number)
  {
    numbering += 1
  }
}
