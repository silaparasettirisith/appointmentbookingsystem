import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { DetailpageComponent } from './detailpage/detailpage.component';



import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthguardGuard } from './authguard.guard';
import * as _ from 'underscore';
import { HomepageComponent } from './homepage/homepage.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    RegisterpageComponent,
    DetailpageComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [AuthguardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
