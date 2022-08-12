import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoginService} from "../login.service";
import {LoginGuard} from "../login.guard";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public login=false;
  constructor(private _loginService:LoginService,public loginguard:LoginGuard) { }


  ngOnInit(): void {
      console.log(this.loginguard.isLoggedIn);
  }


  public type:string="none";

  loggedInEmit(logged: boolean)
  {
    this.loginguard.isLoggedIn=logged;
  }
  getMail(email:string,usertype:[boolean,boolean,boolean]){

    if(usertype[0])
      this.type="customer";
    else if(usertype[1])
      this.type="employee";
    else
      this.type="administrator";
    console.log(email,this.type)
    this._loginService.getLogin(email).subscribe(data=>this.login=data.data[0].count)
    this.loggedInEmit(this.login);

  }

}
