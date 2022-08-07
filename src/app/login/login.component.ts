import { Component, OnInit } from '@angular/core';
import {LoginService} from "../login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public login:any;
  constructor(private _loginService:LoginService) { }


  ngOnInit(): void {

  }

  public type:string="none";

  getMail(email:string,usertype:[boolean,boolean,boolean]){

    if(usertype[0])
      this.type="customer";
    else if(usertype[1])
      this.type="employee";
    else
      this.type="administrator";
    console.log(email,this.type)
    this._loginService.getLogin(email).subscribe(data=>this.login=data.data[0].count)

  }

}
