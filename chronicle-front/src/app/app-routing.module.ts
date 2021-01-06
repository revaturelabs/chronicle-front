import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { NotespageComponent } from './components/notespage/notespage.component';
import { VideopageComponent } from './components/videopage/videopage.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

const routes: Routes = [{
  path: '',
  component: HomepageComponent, canActivate: [AngularFireAuthGuard]
}, {
  path: 'videos',
  component: VideopageComponent, canActivate: [AngularFireAuthGuard]
}, {
  path: 'notes',
  component: NotespageComponent, canActivate: [AngularFireAuthGuard]
}, { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
