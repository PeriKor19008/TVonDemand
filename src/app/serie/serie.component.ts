import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SeasonsService } from '../seasons.service';
import { SerieService } from '../serie.service';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css']
})
export class SerieComponent implements OnInit {

  public userType = new String;
  public userId = new Number;
  public serie:any;
  public serieId = new Number;
  public seasons:any;

  constructor(private _serieService:SerieService, private _seasonsService:SeasonsService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap) => {
      this.userType = String(params.get('type'));
      this.userId = Number(params.get('id'));
      this.serieId = Number(params.get('serie_id'));
      this._serieService.getSerie(this.serieId).subscribe(data => {
        this.serie=data.data;
        this._seasonsService.getSeasons(this.serieId).subscribe(data => {
          this.seasons=data.data;
        });
      });
    });
  }

  gotoSeries()
  {
    this.router.navigate(['../series', {type: this.userType, id: this.userId}], {relativeTo: this.route});
  }

  onSelect(season_id:number)
  {
    this.router.navigate(['../episodes', {type: this.userType, id: this.userId, serie_id: this.serieId, season_id: season_id}], {relativeTo: this.route})
  }

  gotoLanguages(languageId:number)
  {
    this.router.navigate(['../language', {type: this.userType, id: this.userId, language_id: languageId, back_id: this.serieId, backto: "serie"}], {relativeTo: this.route})
  }

  gotoCategories()
  {
    this.router.navigate(['../categories', {type: this.userType, id: this.userId, gettype: 'serie', getid: this.serieId}], {relativeTo: this.route});
  }

  gotoActors()
  {
    this.router.navigate(['../actors', {type: this.userType, id: this.userId, gettype: 'serie', getid: this.serieId}], {relativeTo: this.route});
  }
}
