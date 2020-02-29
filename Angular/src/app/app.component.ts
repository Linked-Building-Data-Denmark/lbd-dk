import { Component, OnInit } from '@angular/core';
import { GlobalsService } from './globals.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public languages;
  public selectedLanguage = "da";
  public params: any = {lang: null};

  constructor(
    private g: GlobalsService,
    private _router: Router
  ){}

  ngOnInit(){

    this.languages = this.g.supportedLanguages;

    // Get language from URL query param
    this.params = new URLSearchParams(window.location.search);
    var lang = this.params.get('lang');
    if(lang) this.selectedLanguage = lang;
  
  }

  changeLanguage(lang){
    this.selectedLanguage = lang;
    this.params.lang = lang;
    this.g.setLanguage(this.selectedLanguage);
    
    // Reload page
    let qp = Object.entries(this.params).map(([key, val]) => `${key}=${val}`).join('&');        
    window.location.href = window.location.pathname+"?"+qp;
  }

  GoToProfile(){
    this._router.navigate(['/profile']);
  }

}
