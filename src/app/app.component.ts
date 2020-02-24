import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { GlobalsService } from './globals.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public language = 'frontend';

  constructor(
    private route: ActivatedRoute,
    private g: GlobalsService
  ){}

  ngOnInit(){

    this.route.queryParams.subscribe(params => {
      if(params['lang'] == undefined) return;
      this.language = params['lang'];
      this.g.setLanguage(this.language);
    });
    
  }

}
