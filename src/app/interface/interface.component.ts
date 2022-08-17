import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'

@Component({
  selector: 'app-customer',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent implements OnInit {

  public options= [
    {"option_id":1, "name": "Profile"},
    {"option_id":2, "name": "Rent Content"},
    {"option_id":3, "name": "Basket and Checkout"},
    {"option_id":4, "name": "Log Out"}
  ];

  public selectedId:any;
  public customerType:any;
  public customerId:any;

  constructor(private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap) => {
      this.customerType = String(params.get('type'));
      this.customerId = Number(params.get('id'));
    })
  }

  onSelect(option:any){
    switch(option)
    {
      case 1:
      {
        console.log("Testing");
        this.router.navigate(['/profile', {type: this.customerType, id: this.customerId}]);
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
    }
  }

  isSelected(option:any){
    return option.id === this.selectedId;
  }

}
