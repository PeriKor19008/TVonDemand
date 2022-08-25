import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MostPopularService } from '../most-popular.service';

@Component({
  selector: 'app-most-popular',
  templateUrl: './most-popular.component.html',
  styleUrls: ['./most-popular.component.css']
})
export class MostPopularComponent implements OnInit {

  public userType = new String;
  public userId:any;
  public mostPopularFilms:any;
  public mostPopularSeries:any;

  constructor(private _mostPopularService:MostPopularService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap) => {
      this.userType = String(params.get('type'));
      this.userId = Number(params.get('id'));
      this._mostPopularService.getMostPopularFilms().subscribe(data => {
        this.mostPopularFilms = data.data[0];
      });
      this._mostPopularService.getMostPopularSeries().subscribe(data => {
        this.mostPopularSeries = data.data[0];
      });
    })
  }

  goBack()
  {
    this.router.navigate(['../customers', {type: this.userType, id: this.userId}], {relativeTo: this.route});
  }

}
