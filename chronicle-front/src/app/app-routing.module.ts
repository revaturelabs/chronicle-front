import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NotespageComponent } from './components/notespage/notespage.component';
import { VideopageComponent } from './components/videopage/videopage.component';
import {LoginComponent} from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [{
  path:'',
  component: HomepageComponent,
  canActivate: [AuthGuard]
},{
  path:'videos',
  component: VideopageComponent,
  canActivate: [AuthGuard]
},{
  path:'notes',
  component: NotespageComponent,
  canActivate: [AuthGuard]
},{ 
  path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
