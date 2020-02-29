import { Component, OnInit } from '@angular/core';

import { ProfileService } from './profile.service';
import { Value } from '../value.pipe';
import { foaf, vcard } from 'rdf-namespaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {

  public session;
  public webId;
  public profile;
  public userName: string;
  public userPhotoURL: string = 'assets/img/avatar1.png';

  public note: string;
  public publicNotes: string[];
  public privateNotes: string[];

  public notLoggedInText = [
    new Value("Please log in to see your profile stuff", "en"),
    new Value("Log ind for at se din profil", "da")
  ];
  public loginText = [
    new Value("Please log in with one of the providers listed below", "en"),
    new Value("Log ind med en af nedenstående providers", "da")
  ]
  public logoutText = [
    new Value("Log out", "en"),
    new Value("Log ud", "da"),
  ]

  constructor(
    private s: ProfileService
  ) { }

  async ngOnInit() {

    await this.getLoginStatus();
    await this.getProfile();
    await this.getNotes();

  }

  async getLoginStatus(){
    try{
      this.session = await this.s.getLoginStatus();
      this.webId = this.session.webId;
    }catch(e){console.log("Couldn't get session")} 
  }

  async login(idp){
    try{
      this.session = await this.s.login(idp);
      this.webId = this.session.webId;
      const notesListRef = this.getProfile();
      console.log(notesListRef);
    }catch(e){console.log(e)} 
    
  }

  async logout(){
    await this.s.logOut();
    this.getLoginStatus();
  }

  async getProfile(){    
    try{
      // this.userName = await this.s.getNameTripledoc(this.webId);
      this.profile = await this.s.getProfile(this.webId);
      this.userName = this.profile.getString(foaf.name);
      const photoURL = this.profile.getRef(vcard.hasPhoto);
      if(photoURL) this.userPhotoURL = photoURL;
    }catch(e){
      console.log(e)
      console.log("Couldn't get profile")
    }
    return;
  }

  async getNotes(type?){
    if(!type || type == 'public') this.publicNotes = await this.s.getNotes(this.profile, 'public');
    if(!type || type == 'private') this.privateNotes = await this.s.getNotes(this.profile, 'private');
  }

  async saveNote(type){
    await this.s.addNote(this.note, this.profile, type);
    this.note = null;
    await this.getNotes(type);
  }

}
