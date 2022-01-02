import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailpageComponent } from './detailpage/detailpage.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { RegisterpageComponent } from './registerpage/registerpage.component';

const routes: Routes = [
  {path:"homepage",component:HomepageComponent},
  {path:"register-page",component:RegisterpageComponent},
  {path:"detailpage",component:DetailpageComponent},
  {path:"",component:LoginpageComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
