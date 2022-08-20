import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, ParamMap } from '@angular/router';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {

  public userType = new String;
  public userId = new Number;
  public film:any;
  public filmId = new Number;
  public rental:any;

  constructor(private _filmService: FilmService, private router:Router, private route:ActivatedRoute, private http:HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap) => {
      this.userType = String(params.get('type'));
      this.userId = Number(params.get('id'));
      this.filmId = Number(params.get('film_id'));
    });
    this._filmService.getFilm(this.filmId).subscribe(data => this.film=data.data);
  }

  gotoFilms()
  {
    this.router.navigate(['/films', {type: this.userType, id: this.userId}]);
  }

  rentFilm()
  { 
    this._filmService.rentFilms(Number(this.film[0].inventory_id), this.userId).subscribe(data => this.rental=data.data);
  }

  gotoLanguages(languageId:Number)
  {
    this.router.navigate(['/language', {type: this.userType, id: this.userId, language_id: languageId, back_id: this.filmId, backto: "film"}])
  }
}
