import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NotespageComponent } from './components/notespage/notespage.component';
import { VideopageComponent } from './components/videopage/videopage.component';
import {LoginComponent} from './components/login/login.component';

const routes: Routes = [{
  path:'',
  component: HomepageComponent
},{
  path:'videos',
  component: VideopageComponent
},{
  path:'notes',
  component: NotespageComponent
},
 { path: 'Login', 
  component: LoginComponent
},];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
