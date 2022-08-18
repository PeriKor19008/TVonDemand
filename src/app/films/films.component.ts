import { Component, OnInit } from '@angular/core';
import {FilmsService} from "../films.service";
import {Films,IFilms} from "../exports_for_services";
import { ActivatedRoute, Router, ParamMap, Route } from '@angular/router';

@Component({
  selector: 'app-films',
  templateUrl: `./films.component.html`,
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  public films:any;
  public userType = new String;
  public userId = new Number;


  constructor(private _filmsService: FilmsService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params:ParamMap) => {
      this.userType = String(params.get('type'));
      this.userId = Number(params.get('id'));
    });
    this._filmsService.getFilms().subscribe
      (data => this.films=data.data);
  }

  onSelect(film_id:number)
  {
    this.router.navigate(['/film', {type: this.userType, id: this.userId, film_id: film_id}]);
  }

  gotoInterface(){
    this.router.navigate(['/interface', {type: this.userType, id: this.userId}]);
  }
}
