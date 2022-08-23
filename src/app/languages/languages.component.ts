import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LanguagesService } from '../languages.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {

  public userType = new String;
  public userId = new Number;
  public backId = new Number;
  public backTo = new String;
  public languageId = new Number;
  public language:any;
  
  constructor(private _languagesService: LanguagesService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap) => {
      this.userType = String(params.get('type'));
      this.userId = Number(params.get('id'));
      this.backId = Number(params.get('back_id'));
      this.backTo = String(params.get('backto'));
      this.languageId = Number(params.get('language_id'));
      this._languagesService.getLanguage(this.languageId).subscribe(data => {
        this.language=data.data;
      });
    });
  }

  goBack()
  {
    if(this.backTo == 'film')
      this.router.navigate(["../" + this.backTo, {type: this.userType, id: this.userId, film_id: this.backId}], {relativeTo: this.route})
    else
      this.router.navigate(["../" + this.backTo, {type: this.userType, id: this.userId, serie_id: this.backId}], {relativeTo: this.route})
  }
}
