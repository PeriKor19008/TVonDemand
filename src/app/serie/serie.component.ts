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
  public seasonId:any;

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
          this.seasonId = Number(data.data[0].season_id);
        });
      });
    });
  }

  gotoSeries()
  {
    this.router.navigate(['/series', {type: this.userType, id: this.userId}]);
  }

  onSelect(season_id:number)
  {
    this.router.navigate(['/episodes', {type: this.userType, id: this.userId, serie_id: this.serieId, season_id: this.seasonId}])
  }
}
