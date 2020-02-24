import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { LandingPageComponent } from 'src/app/landing-page/landing-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  // { path: 'welcome', component: LandingPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }