import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { ResultsComponent } from './components/results/results.component';

const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: '', component: ResultsComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forRoot(routes)]
  ],
  exports: [
    RouterModule
  ]

})
export class AppRoutingModule { }
