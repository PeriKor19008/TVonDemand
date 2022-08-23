import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SeriesService } from '../series.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

  public series:any;
  public userType = new String;
  public userId = new Number;

  constructor(private _seriesService: SeriesService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap) => {
      this.userType = String(params.get('type'));
      this.userId = Number(params.get('id'));
    });
    this._seriesService.getSeries().subscribe
      (data => this.series=data.data);
  }

  onSelect(serie_id:number)
  {
    this.router.navigate(['../serie', {type: this.userType, id: this.userId, serie_id: serie_id}], {relativeTo: this.route});
  }

  gotoInterface(){
    this.router.navigate(['../profile', {type: this.userType, id: this.userId}], {relativeTo: this.route});
  }
}
