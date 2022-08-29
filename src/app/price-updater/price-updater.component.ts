import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EditDbService } from '../edit-db.service';
import { AdministratorProfile } from '../exports_for_services';

@Component({
  selector: 'app-price-updater',
  templateUrl: './price-updater.component.html',
  styleUrls: ['./price-updater.component.css']
})
export class PriceUpdaterComponent implements OnInit {

  public userType = new String;
  public userId = new Number;
  public optionSelection = new String;
  public update:any;
  public updated = false;

  public prices: any[] = ['film', 'serie', 'film_both', 'serie_both'];

  constructor(private _editDbService:EditDbService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap) => {
      this.userType = String(params.get('type'));
      this.userId = Number(params.get('id'));
    });
  }

  onOptionChange(event:any)
  {
    this.optionSelection = String(event.value);
  }

  updateToDb(value:string)
  {
    this._editDbService.updateTable("price", "amount", value, "price_entry", "'" + this.optionSelection + "'").subscribe(data => {
      this.update=data.data;
      this.updated = true;
    });
  }

  goBack()
  {
    this.router.navigate(['../update_database', {type: this.userType, id: this.userId}], {relativeTo: this.route});
  }
}
