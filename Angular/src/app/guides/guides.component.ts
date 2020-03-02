import { Component, OnInit } from '@angular/core';
import { GuidesService } from './guides.service';
import { Value } from '../value.pipe';

@Component({
  selector: 'app-guides',
  templateUrl: './guides.component.html',
  styleUrls: ['./guides.component.css'],
  providers: [GuidesService]
})
export class GuidesComponent implements OnInit {

  public session;
  public webId;

  public searchGuidesLabel = [
    new Value("Search guides", "en"),
    new Value("Søg i vejledninger", "da")
  ]
  public newGuideLabel = [
    new Value("Create guide", "en"),
    new Value("Opret vejledning", "da")
  ]
  public newGuideTitleLabel = [
    new Value("Title", "en"),
    new Value("Titel", "da")
  ]

  constructor(
    private s: GuidesService
  ) { }

  ngOnInit(): void {
    this.getLoginStatus();
  }

  async getLoginStatus(){
    try{
      this.session = await this.s.getLoginStatus();
      this.webId = this.session.webId;
    }catch(e){console.log("Couldn't get session")} 
  }

}
