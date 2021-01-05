import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NotespageComponent } from './components/notespage/notespage.component';
import { UploadpageComponent } from './components/uploadpage/uploadpage.component';
import { VideopageComponent } from './components/videopage/videopage.component';

const routes: Routes = [{
  path:'',
  component: HomepageComponent
},{
  path:'videos',
  component: VideopageComponent
},{
  path:'notes',
  component: NotespageComponent
},{
  path:'upload',
  component: UploadpageComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
