import { Component, OnInit } from '@angular/core';

import { ProfileService } from './profile.service';
import { Value } from '../value.pipe';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {

  public session;

  public notLoggedInText = [
    new Value("Please log in to see your profile stuff", "en"),
    new Value("Log ind for at se din profil", "da")
  ];
  public loginText = [
    new Value("Please log in with one of the providers listed below", "en"),
    new Value("Log ind med en af nedenstående providers", "da")
  ]
  public loggedInText = [
    new Value("Logged in as", "en"),
    new Value("Logget ind som", "da"),
  ]
  public logoutText = [
    new Value("Log out", "en"),
    new Value("Log ud", "da"),
  ]

  constructor(
    private s: ProfileService
  ) { }

  async ngOnInit() {

    this.getLoginStatus();

  }

  async getLoginStatus(){
    try{
      this.session = await this.s.getLoginStatus();
      console.log(this.session);
    }catch(e){console.log("Couldn't get session")} 
  }

  async login(idp){
    try{
      this.session = await this.s.login(idp);
    }catch(e){console.log("Couldn't log in")} 
    
  }

  async logout(){
    await this.s.logOut();
    this.getLoginStatus();
  }

}
