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

  constructor(private _filmService: FilmService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap) => {
      this.userType = String(params.get('type'));
      this.userId = Number(params.get('id'));
      this.filmId = Number(params.get('film_id'));
    });
    this._filmService.getFilm(this.filmId).subscribe(data => this.film=data.data);
      console.log(this.film);
  }

  gotoFilms()
  {
    this.router.navigate(['/films', {type: this.userType, id: this.userId}]);
  }

}
