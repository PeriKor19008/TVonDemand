import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  public userType = new String;
  public userId = new Number;
  public getId = new Number;
  public getType = new String; 
  public categories:any;
  
  constructor(private _categoriesService:CategoriesService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap) => {
      this.userType = String(params.get('type'));
      this.userId = Number(params.get('id'));
      this.getType = String(params.get('gettype'))
      this.getId = Number(params.get('getid'));
      if(this.getType == 'film')
        this._categoriesService.getFilmCategories(this.getId).subscribe(data => this.categories = data.data);
      else 
        this._categoriesService.getSerieCategories(this.getId).subscribe(data => this.categories = data.data);
    });
  }

  onSelect(category_id:Number)
  {

  }
  
  goBack()
  {
    if(this.getType == 'film')
      this.router.navigate(['/film', {type: this.userType, id: this.userId, film_id: this.getId}]);
    else
      this.router.navigate(['/serie', {type: this.userType, id: this.userId, serie_id: this.getId}]);
  }
}
