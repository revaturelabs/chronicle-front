import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {HomepageComponent} from './components/homepage/homepage.component';

const routes: Routes = [
  { path: 'Login', component: LoginComponent},
  { path: '', component: HomepageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
