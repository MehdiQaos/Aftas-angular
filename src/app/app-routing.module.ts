import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompetitionsComponent } from "./component/competitions/competitions.component";
import { CompetitionDetailsComponent } from "./component/competition-details/competition-details.component";
import { MembersComponent } from "./component/members/members.component";
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'competitions', component: CompetitionsComponent },
  { path: 'competitions/:id', component: CompetitionDetailsComponent },
  { path: 'members', component: MembersComponent },
  { path: '**', redirectTo: 'competitions' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
