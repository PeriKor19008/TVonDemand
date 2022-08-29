import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ActorsService } from '../actors.service';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent implements OnInit {

  public userType = new String;
  public userId = new Number;
  public getType = new String;
  public getId = new Number;
  public actors:any;

  constructor(private _actorsService:ActorsService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap) => {
    this.userType = String(params.get('type'));
    this.userId = Number(params.get('id'));
    this.getType = String(params.get('gettype'))
    this.getId = Number(params.get('getid'));
    if(this.getType == 'film')
      this._actorsService.getFilmActors(this.getId).subscribe(data => {
        this.actors = data.data;
        console.log(this.actors);
      });
    else 
      this._actorsService.getSerieActors(this.getId).subscribe(data => {
        this.actors = data.data;
        console.log(this.actors);
      });
    });
  }

  onSelect(actor_id:number)
  {

  }

  goBack()
  {
    if(this.getType == 'film')
      this.router.navigate(['../film', {type: this.userType, id: this.userId, film_id: this.getId}], {relativeTo: this.route});
    else
      this.router.navigate(['../serie', {type: this.userType, id: this.userId, serie_id: this.getId}], {relativeTo: this.route});
  }
}
