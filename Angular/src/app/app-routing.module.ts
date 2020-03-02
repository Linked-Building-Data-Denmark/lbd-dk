import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from 'src/app/profile/profile.component';
import { GuidesComponent } from 'src/app/guides/guides.component';
import { LandingPageComponent } from 'src/app/landing-page/landing-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { 
    path: 'profile', 
    component: ProfileComponent
  },
  { 
    path: 'guides', 
    component: GuidesComponent
  },
  // { path: 'welcome', component: LandingPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }