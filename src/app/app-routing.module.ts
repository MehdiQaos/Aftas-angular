import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompetitionsComponent } from "./component/competitions/competitions.component";

const routes: Routes = [
  { path: 'competitions', component: CompetitionsComponent },
  { path: '**', redirectTo: 'competitions' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
