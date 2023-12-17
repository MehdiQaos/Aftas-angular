import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { CompetitionsComponent } from './component/competitions/competitions.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CreateCompetitionComponent } from './component/create-competition/create-competition.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CompetitionsComponent,
    CreateCompetitionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
