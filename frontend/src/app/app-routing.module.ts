import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { HomeComponent } from './components/home/home.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AppComponent } from './app.component';
import { HistoryComponent } from './components/history/history.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: '', component: AppComponent},
  { path: 'search', canActivate: [AuthGuardService],  component: SearchComponent },
  { path: 'history', canActivate: [AuthGuardService],  component: HistoryComponent }
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
