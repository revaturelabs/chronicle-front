import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { NotespageComponent } from './components/notespage/notespage.component';
import { UploadpageComponent } from './components/uploadpage/uploadpage.component';
import { VideopageComponent } from './components/videopage/videopage.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { ViewvideopageComponent } from './components/viewvideopage/viewvideopage.component';
import { AttributionComponent } from './components/attribution/attribution.component';
import { ViewnotepageComponent } from './components/viewnotepage/viewnotepage.component';

const routes: Routes = [{
  path: '',
  component: HomepageComponent, canActivate: [AngularFireAuthGuard]
},
{
  path: 'attribution',
  component: AttributionComponent, canActivate: [AngularFireAuthGuard]
}, {
  path: 'videos',
  component: VideopageComponent, canActivate: [AngularFireAuthGuard]
}, {
  path: 'notes',
  component: NotespageComponent, canActivate: [AngularFireAuthGuard]
}, { 
  path: 'login', 
  component: LoginComponent 
}, {
  path:'upload',
  component: UploadpageComponent
}, {
  path:'videos/:id',
  component: ViewvideopageComponent
}, {
  path:'notes/:id',
  component: ViewnotepageComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


/**
 * APP Routing Page:
 * 
 * Notes: Angular Fire Auth Guard checks against isLoggedIn by default,
 *  can add params to make it check custom claims as well
 * 
 * */
export class AppRoutingModule { }
