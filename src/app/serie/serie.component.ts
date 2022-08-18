import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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

  constructor(private _serieService: SerieService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap) => {
      this.userType = String(params.get('type'));
      this.userId = Number(params.get('id'));
      this.serieId = Number(params.get('serie_id'));
    });
    this._serieService.getSerie(this.serieId).subscribe(data => this.serie=data.data);
      console.log(this.serie);
  }

  gotoSeries()
  {
    this.router.navigate(['/series', {type: this.userType, id: this.userId}]);
  }
}
