import { Component, OnInit } from '@angular/core';
import { Value } from 'src/app/value.pipe';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  joinSlack = [
    new Value("Join our Slack channel", "en"),
    new Value("Join vores Slack channel", "da")
  ]
  joinFB = [
    new Value("Join our Facebook group", "en"),
    new Value("Join vores Facebook-gruppe", "da"),
  ]

  constructor() { }

  ngOnInit(): void {
  }

  openSlack(){
    window.open("https://linkedbuildingdata-dk.slack.com");
  }

  openFB(){
    window.open("https://www.facebook.com/groups/841043836309086/852676755145794");
  }

}
