import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Angular Material Module
import { MaterialModule } from './angular-material.module';

import { AppRoutingModule } from './app.routing.module';


import { AppComponent } from './app.component';
import { BeerItemsComponent, DialogDataExampleDialog } from './components/beer-items.component';

//import services
import { BeerItemsService } from './services/beer-items.service';
import { HighlightPipe } from './pipe/highlight.pipe'


@NgModule({
  declarations: [
    AppComponent, HighlightPipe, BeerItemsComponent, DialogDataExampleDialog
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, BrowserAnimationsModule, AppRoutingModule, MaterialModule, ReactiveFormsModule
  ],
  entryComponents: [BeerItemsComponent, DialogDataExampleDialog],
  providers: [BeerItemsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
