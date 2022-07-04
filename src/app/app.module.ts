import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AngularFireModule} from '@angular/fire'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ZfooterComponent } from './zfooter/zfooter.component';
import { HomeComponent } from './home/home.component';
import { RegistComponent } from './regist/regist.component';
import { FormsModule } from '@angular/forms';
import { ReportComponent } from './report/report.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { CallingComponent } from './calling/calling.component';
import { CallcenterComponent } from './callcenter/callcenter.component';
import { GethelpComponent } from './gethelp/gethelp.component';
import { MasterComponent } from './master/master.component';
import { MasterloginComponent } from './masterlogin/masterlogin.component';
import { CommentsAndReportsComponent } from './comments-and-reports/comments-and-reports.component';
// import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ZfooterComponent,
    HomeComponent,
    RegistComponent,
    ReportComponent,
    AboutusComponent,
    CallingComponent,
    CallcenterComponent,
    GethelpComponent,
    MasterComponent,
    MasterloginComponent,
    CommentsAndReportsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDnvtbaXgpAUiM9ZUnOORiy7_UElQSp13k",
      authDomain: "portonew-9f052.firebaseapp.com",
      projectId: "portonew-9f052",
      storageBucket: "portonew-9f052.appspot.com",
      messagingSenderId: "647027141225",
      appId: "1:647027141225:web:cd8b23025853445b41d0f8",
      measurementId: "G-LKE4JDSGP7"
    }),
    // AngularFirestoreModule
  ],
  providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule { }
