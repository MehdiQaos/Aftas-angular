import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { CompetitionsComponent } from './component/competitions/competitions.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CreateCompetitionComponent } from './component/create-competition/create-competition.component';
import { PaginatorComponent } from './component/paginator/paginator.component';
import { CompetitionDetailsComponent } from './component/competition-details/competition-details.component';
import { FishesComponent } from './component/fishes/fishes.component';
import { MembersComponent } from './component/members/members.component';
import { LoginComponent } from './component/login/login.component';
import { CustomInterceptor } from './interceptor/custom.interceptor';
import { RegisterComponent } from './component/register/register.component';
import { HandleErrorInterceptor } from './interceptor/handle-error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CompetitionsComponent,
    CreateCompetitionComponent,
    PaginatorComponent,
    CompetitionDetailsComponent,
    FishesComponent,
    MembersComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HandleErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
