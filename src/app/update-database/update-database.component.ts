import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EditDbService } from '../edit-db.service';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-update-database',
  templateUrl: './update-database.component.html',
  styleUrls: ['./update-database.component.css']
})
export class UpdateDatabaseComponent implements OnInit {

  public userType = new String;
  public userId = new Number;
  public update:any;
  public delete:any;
  public updated = false;

  public options: any[] = ['INSERT', 'UPDATE', 'DELETE'];
  public tables: any[] = ['actor', 'address', 'category', 'city', 'country', 'episode', 'film', 'film_actor', 'film_category', 'film_inventory', 'language',  'season', 'serie', 'serie_actor', 'serie_category', 'serie_inventory'];
  public actorValues: any[] = ['actor_id', 'first_name', 'last_name'];
  public addressValues: any[] = ['address_id', 'address', 'district', 'city_id', 'postal_code', 'phone'];
  public categoryValues: any[] =  ['category_id', 'name'];
  public cityValues: any[] =  ['city_id', 'city', 'country_id'];
  public countryValues: any[] =  ['country_id', 'country'];
  public episodeValues: any[] = ['episode_id', 'episode_number', 'belongs_to'];
  public filmValues: any[] = ['film_id', 'title', 'release_year', 'original_language', 'length', 'rating', 'special_features'];
  public film_actorValues: any = ['film_id', 'actor_id'];
  public film_categoryValues: any = ['film_id', 'category_id'];
  public film_inventoryValues: any = ['inventory_id', 'film_id'];
  public languageValues: any = ['language_id', 'name'];
  public seasonValues: any = ['season_id', 'season_number', 'belongs_to'];
  public serieValues: any = ['serie_id', 'title', 'description', 'release_year', 'language_id', 'optional_language_id', 'rating', 'special_features'];
  public serie_actorValues: any = ['serie_id', 'actor_id'];
  public serie_categoryValues: any = ['serie_id', 'category_id'];
  public serie_inventoryValues: any = ['inventory_id', 'episode_id'];

  public adminOptions: any[] = ['INSERT','DELETE', 'TOGGLE EMPLOYEE AND ADMIN'];
  public adminTables: any[] = ['customer', 'employee'];
  public adminToggleTables: any[] = ['employee', 'administrator'];
  public customerValues: any[] = ['customer_id', 'first_name', 'last_name', 'email', 'address_id', 'active', 'create_date', 'view_type'];
  public employeeValues: any[] = ['employee_id', 'first_name', 'last_name', 'email', 'address_id', 'active', 'create_date'];
  public administratorValues: any[] = ['administrator_id', 'first_name', 'last_name', 'email', 'address_id', 'active', 'create_date'];

  public profile:any;
  
  public optionSelection = new String;
  public tableSelection = new String;
  public columnSelection = new String;
  public whereSelection = new String;


  constructor(private _editDbService:EditDbService, private _profileService:ProfileService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap) => {
      this.userType = String(params.get('type'));
      this.userId = Number(params.get('id'));
    })
  }

  onOptionChange(event:any)
  {
    this.optionSelection = String(event.value);
  }

  onTableChange(event:any)
  {
    this.tableSelection = String(event.value);
    this.columnSelection = '';
    this.whereSelection = '';
  }

  onColumnChange(event:any)
  {
    this.columnSelection = String(event.value);
  }
  
  onWhereChange(event:any)
  {
    this.whereSelection = String(event.value);
  }

  insertToDb(value:string, columns:string)
  {
    this._editDbService.insertToTable(this.tableSelection, columns, value).subscribe(data => {
      this.update=data.data;
      this.updated = true;
    })
  }

  updateToDb(value:string, condvalue:string)
  {
    this._editDbService.updateTable(this.tableSelection, this.columnSelection, value, this.whereSelection, condvalue).subscribe(data => {
      this.update=data.data;
      this.updated = true;
    });
  }

  deleteFromDb(condvalue:string)
  {
    this._editDbService.deleteFromTable(this.tableSelection, this.whereSelection, condvalue).subscribe(data => {
      this.update=data.data;
      this.updated = true;
    });
  }

  toggleType(id:string)
  {
    console.log(id);
    if(this.tableSelection == 'employee')
    {
      this._profileService.getEmployeeProfile(Number(id)).subscribe(data =>
        this.profile = data.data[0]);
      this._editDbService.deleteFromTable(this.tableSelection, 'employee_id', id).subscribe(data => {
        this.update=data.data;
        console.log(this.profile.employee_id + ", '" + this.profile.first_name + "', " + "'" + this.profile.last_name + "', " + this.profile.email + "', '" + this.profile.address_id + "', " + this.profile.active + ', ' + this.profile.create_date);
        this._editDbService.insertToTable('administrator', "administrator_id, first_name, last_name, email, address_id, active, create_date", this.profile.employee_id + ", '" + this.profile.first_name + "', '" + this.profile.last_name + "', '" + this.profile.email + "', " + this.profile.address_id + ", " + this.profile.active + ", NOW()").subscribe(data => {
          this.delete=data.data;
          this.updated = true;
        });
      });
    }
    else
    {
      this._profileService.getAdministratorProfile(Number(id)).subscribe(data =>
        this.profile = data.data[0]);
      this._editDbService.deleteFromTable(this.tableSelection, 'administrator_id', id).subscribe(data => {
        this.update=data.data;
        this._editDbService.insertToTable('employee', "employee_id, first_name, last_name, email, address_id, active, create_date", this.profile.administrator_id + ", '" + this.profile.first_name + "', '" + this.profile.last_name + "', '" + this.profile.email + "', " + this.profile.address_id + ", " + this.profile.active + ", NOW()").subscribe(data => {
          this.delete=data.data;
          this.updated = true;
        });
      });
    }
  }

  goBack()
  {
    this.router.navigate(['../customers', {type: this.userType, id: this.userId}], {relativeTo: this.route});
  }
}
