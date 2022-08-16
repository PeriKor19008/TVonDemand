import { Component, OnInit } from '@angular/core';
import { LoginService } from "../login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public response:any;
  constructor(private _loginService:LoginService) { }

  ngOnInit(): void {
  }

  getMail(email:string){
    console.log(email);
    this._loginService.getLogin(email).subscribe(data=>this.response=data.data[0])
    console.log(this.response);
  }

}
