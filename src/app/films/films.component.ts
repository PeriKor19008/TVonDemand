import { Component, OnInit } from '@angular/core';
import {FilmsService} from "../films.service";
import {Films,IFilms} from "../film";

@Component({
  selector: 'app-films',
  templateUrl: `./films.component.html`,
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  public films:any;


  constructor(private _filmService: FilmsService) { }

  ngOnInit() {
    this._filmService.getFilms()
      .subscribe(data => this.films=data.data);
      console.log(this.films);
  }

}
