import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IncomeService } from '../income.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {

  public userType = new String;
  public userId = new Number;
  public income:any;

  constructor(private router:Router, private route:ActivatedRoute, private _getIncomeService:IncomeService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap) => {
      this.userType = String(params.get('type'));
      this.userId = Number(params.get('id'));
      this._getIncomeService.getIncome().subscribe(data => {
        this.income = data.data;
      });
    })
  }

  goBack()
  {
    this.router.navigate(['../update_database', {type: this.userType, id: this.userId}], {relativeTo: this.route});
  }

}
