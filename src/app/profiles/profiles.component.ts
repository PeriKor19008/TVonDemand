import { Component, OnInit } from '@angular/core';
import {ProfilesService} from "../profiles.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IProfiles} from "../exports_for_services";

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})

export class ProfilesComponent implements OnInit {
  public profiles:any;
  public det=false;
  constructor(private _profilesService: ProfilesService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this._profilesService.getProfiles().subscribe
    (data => this.profiles=data.data);
  }
  editProfili(id:number){
    this.router.navigate(['../profile_edit', { id:id}], {relativeTo: this.route});
  }

}
