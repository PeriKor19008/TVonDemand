import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { GetViewTypeService } from '../get-view-type.service';

@Component({
  selector: 'app-customer',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent implements OnInit {

  public options= [
    {"option_id":1, "name": "Profile"},
    {"option_id":2, "name": "Rent Film"},
    {"option_id":3, "name": "Rent Serie"},
    {"option_id":4, "name": "Shopping Cart and Checkout"},
    {"option_id":5, "name": "Log Out"}
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
    }
  }

  onSelect(option:any){
    switch(option)
    {
      case 1:
      {
        this.router.navigate(['/profile', {type: this.userType, id: this.userId}]);
        break;
      }
      case 2:
      {
        this.router.navigate(['/films', {type: this.userType, id: this.userId}]);
        break;
      }
      case 3:
      {
        this.router.navigate(['/series', {type: this.userType, id: this.userId}]);
        break;
      }
      case 4:
      {
        this.router.navigate(['/cart', {type: this.userType, id: this.userId}]);
        break;
      }
      case 5:
      {
        this.router.navigate(['/login']);
        break;
      }
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
