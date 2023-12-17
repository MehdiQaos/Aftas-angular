import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompetitionsComponent } from "./component/competitions/competitions.component";
import { CompetitionDetailsComponent } from "./component/competition-details/competition-details.component";

const routes: Routes = [
  { path: 'competitions', component: CompetitionsComponent },
  { path: 'competitions/:id', component: CompetitionDetailsComponent },
  { path: '**', redirectTo: 'competitions' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
