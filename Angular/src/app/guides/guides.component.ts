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
  public profile;

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
  public newGuideLanguageLabel = [
    new Value("Language", "en"),
    new Value("Sprog", "da")
  ]
  public publishGuideLabel = [
    new Value("Publish guide", "en"),
    new Value("Udgiv vejledning", "da")
  ]

  public languages = [
    {value: 'en', text: [
      new Value("English", "en"),
      new Value("Engelsk", "da")
    ]},
    {value: 'da', text: [
      new Value("Danish", "en"),
      new Value("Dansk", "da")
    ]}
  ]

  public wipLabel = [
    new Value("NB! We are still working on this feature, so nothing will be saved to your pod yet.", "en"),
    new Value("NB! Vi arbejder stadig på denne funktionalitet, så intet vil blive gemt til din pod endnu", "da")
  ]

  // Form
  public guideTitle: string;
  public guideText: string;
  public guideLanguage: string;

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
      this.profile = await this.s.getProfile(this.webId);
    }catch(e){console.log("Couldn't get session")} 
  }

  publishGuide(){
    console.log("publish guide");
    console.log(this.guideTitle);
    console.log(this.guideText);
    console.log(this.guideLanguage);

    this.s.addGuide(this.guideTitle, this.guideLanguage, this.guideText , this.profile);
  }

}
