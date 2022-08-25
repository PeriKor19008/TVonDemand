import { Component, OnInit } from '@angular/core';
import { LoginService } from "../login.service";
import { Router } from '@angular/router';

declare function autoEnter(elementName:String, buttonName:String):any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public notFound = false;
  public found = new Boolean;
  public type = new String;
  public id = new Number;

  constructor(private _loginService:LoginService, private router:Router) { }

  ngOnInit() {
    autoEnter("loginTextField", "loginButton");
  }

  getMail(email:string){
    console.log(email);
    this._loginService.getLogin(email).subscribe(data=> {
      this.found = data.data[0].Found;
      this.type = data.data[0].Type;
      this.id = data.data[0].ID;
      if(!this.found)
      {
        this.notFound = true;
      }
      else
      {
        this.router.navigate(['/interface', {type: this.type, id: this.id}]);
      }
    });
  }
}