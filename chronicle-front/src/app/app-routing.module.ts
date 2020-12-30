import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NotespageComponent } from './components/notespage/notespage.component';
import { VideopageComponent } from './components/videopage/videopage.component';
import { ViewvideopageComponent } from './components/viewvideopage/viewvideopage.component';

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
{
  path:'videos/:id',
  component: ViewvideopageComponent
},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
