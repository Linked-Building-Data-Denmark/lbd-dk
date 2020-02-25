import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from 'src/app/profile/profile.component';
import { LandingPageComponent } from 'src/app/landing-page/landing-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { 
    path: 'profile', 
    component: ProfileComponent
  },
  // { path: 'welcome', component: LandingPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }