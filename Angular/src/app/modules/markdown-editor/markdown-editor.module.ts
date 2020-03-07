import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MarkdownModule } from 'ngx-markdown';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDividerModule} from '@angular/material/divider';
import {MatTooltipModule} from '@angular/material/tooltip';

import {FlexLayoutModule} from '@angular/flex-layout';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
 
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

// Module components
import { MarkdownEditorComponent } from './markdown-editor.component';
import { MDToolbarComponent } from './toolbar/md-toolbar.component';

@NgModule({
  declarations: [
    MarkdownEditorComponent,
    MDToolbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MarkdownModule.forRoot(),
    PerfectScrollbarModule,
    MatIconModule,
    MatButtonModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatDividerModule,
    MatTooltipModule,
    MatInputModule,
    FlexLayoutModule,
    MatButtonToggleModule,
    MatToolbarModule
  ],
  exports: [
    MarkdownEditorComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class MarkdownEditorModule { }
