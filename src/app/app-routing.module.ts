import { Component, NgModule } from '@angular/core';
import { combineChange } from '@angular/fire/firestore';
import { Routes, RouterModule } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { CallcenterComponent } from './callcenter/callcenter.component';
import { CallingComponent } from './calling/calling.component';
import { CategoryComponent } from './category/category.component';
import { CommentsAndReportsComponent } from './comments-and-reports/comments-and-reports.component';
import { GethelpComponent } from './gethelp/gethelp.component';
import { HomeComponent } from './home/home.component';
import { MasterComponent } from './master/master.component';
import { MasterloginComponent } from './masterlogin/masterlogin.component';
import { RegistComponent } from './regist/regist.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {path:"",component:HomeComponent},

  {path:"home",component:HomeComponent},

  {path:"regist" ,component:RegistComponent},

  {path:"report",component:ReportComponent},

  {path:"aboutus" , component:AboutusComponent},

  {path:"calling" , component:CallingComponent},

  {path:"callcenter" ,component:CallcenterComponent},

  {path:"master" ,component:MasterComponent},

  {path:"masterlogin" ,component:MasterloginComponent},

  {path:"category" ,component:CategoryComponent},

  {path:"comments" ,component:CommentsAndReportsComponent},
  
  {path:"gethelp",component :GethelpComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
