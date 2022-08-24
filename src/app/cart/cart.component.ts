import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EpisodesService } from '../episodes.service';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public userType = new String;
  public userId = new Number;
  public filmsCart:any;
  public seriesCart:any;
  public filmPayment:any;
  public filmPaid = false;
  public seriePayment:any;
  public seriePaid = false;
  public showPaid = false;
  public filmsOldRentals:any;
  public seriesOldRentals:any;

  constructor(private _filmService:FilmService, private _episodesService:EpisodesService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
      this.route.paramMap.subscribe((params:ParamMap) => {
        this.userType = String(params.get('type'));
        this.userId = Number(params.get('id'));
        if (this.userType != 'Series')
        {
          this._filmService.getFilmsCart(this.userId).subscribe(data => {
            this.filmsCart=data.data;
          });
          this._filmService.getFilmsOldRentals(this.userId).subscribe(data => {
            this.filmsOldRentals=data.data;
          });
        }
        if (this.userType != 'Films')
        {
          this._episodesService.getSeriesCart(this.userId).subscribe(data => {
            this.seriesCart=data.data;
          });
          this._episodesService.getSeriesOldRentals(this.userId).subscribe(data => {
            this.seriesOldRentals=data.data;
          });
        }
     });
  }

  filmPay(rental_id:Number)
  {
    this._filmService.payFilm(rental_id).subscribe(data => {
      this.filmPayment=data.data;
      this.filmPaid = true;
    });
  }

  seriePay(rental_id:Number)
  {
    this._episodesService.paySerie(rental_id).subscribe(data => {
      this.seriePayment=data.data;
      this.seriePaid = true;
    });
  }

  gotoInterface(){
    this.router.navigate(['../profile', {type: this.userType, id: this.userId}], {relativeTo: this.route});
  }

  toggleOldRentals(){
    if(!this.showPaid)
      this.showPaid = true;
    else
      this.showPaid = false;
  }
}
