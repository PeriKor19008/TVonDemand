import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EpisodesService } from '../episodes.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css']
})
export class EpisodesComponent implements OnInit {

  public userType = new String;
  public userId = new Number;
  public seasonId = new Number;
  public serieId = new Number;
  public episodes:any;
  public rental:any;
  public rented = false;

  constructor(private _episodesService:EpisodesService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap) => {
      this.userType = String(params.get('type'));
      this.userId = Number(params.get('id'));
      this.serieId = Number(params.get('serie_id'))
      this.seasonId = Number(params.get('season_id'));
      this._episodesService.getEpisodes(this.seasonId).subscribe(data => {
        this.episodes=data.data;
      });
    });
  }

  gotoSerie()
  {
    this.router.navigate(['../serie', {type: this.userType, id: this.userId, serie_id: this.serieId}], {relativeTo: this.route});
  }

  episodeRent(inventory_id:number)
  {
    this._episodesService.rentEpisodes(Number(inventory_id), this.userId).subscribe(data => this.rental=data.data);
    this.rented = true;
    console.log(this.rented);
  }
}
