import { Component, OnInit } from '@angular/core';
import { Value } from 'src/app/value.pipe';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  title = [
    new Value("Welcome to Linked Building Data Denmark", "en"),
    new Value("Velkommen til Linked Building Data Danmark", "da"),
  ]
  sub1 = [
    new Value("We are brewing something cool here! But first, the brew needs to do its thing, and that takes the time it takes!", "en"),
    new Value("Vi brygger på noget fedt! Men først skal bryggen gære, og det tager den tid sådan noget tager!", "da"),
  ]
  sub2 = [
    new Value("Until then, please have a look at one of the below channels", "en"),
    new Value("Indtil videre må du nøjes med en af nedenstående kanaler", "da"),
  ]

  joinGithub = [
    new Value("Join us on Github", "en"),
    new Value("Join os på Github", "da"),
  ]
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

  openGithub(){
    window.open("https://github.com/Linked-Building-Data-Denmark");
  }

}
