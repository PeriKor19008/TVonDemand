import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Router} from "@angular/router";
import {ProfileService} from "../profile.service";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  public id:any;
  public profile:any;
  public Id=0;

  constructor(private _profileService: ProfileService,private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap) => {
      this.id = params.get('id');
    });


    this._profileService.getCustomerProfile(this.id).subscribe
    (data => this.profile=data.data[0]);
    console.log(this.profile);
  }

}
