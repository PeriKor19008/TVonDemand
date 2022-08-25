import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  public customers:any;
  public userType = new String;
  public userId = new Number;
  public getId = new Number;

  constructor(private _customersService: CustomersService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params:ParamMap) => {
      this.userType = String(params.get('type'));
      this.userId = Number(params.get('id'));
    });
    this._customersService.getCustomers().subscribe
      (data => this.customers=data.data);
  }

  onSelect(customer_id:number)
  {
    this.router.navigate(['../profile', {type: this.userType, id: this.userId, customer_id: customer_id}], {relativeTo: this.route});
  }
}
