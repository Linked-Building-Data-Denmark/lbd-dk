import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';

import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';

// App modules
import { MarkdownEditorModule } from 'src/app/modules/markdown-editor/markdown-editor.module';

// App services
import { GlobalsService } from 'src/app/services/globals.service';
import { UserService } from 'src/app/services/user.service';

// App components
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ValuePipe } from './value.pipe';
import { ProfileComponent } from './profile/profile.component';
import { UserStoriesComponent } from './user-stories/user-stories.component';
import { GuidesComponent } from './guides/guides.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ValuePipe,
    ProfileComponent,
    UserStoriesComponent,
    GuidesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MarkdownEditorModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    BrowserAnimationsModule
  ],
  providers: [
    GlobalsService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
