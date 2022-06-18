import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

// Firebase services + environment module
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PhoneLoginComponent } from './phone-login/phone-login.component';

const firebaseConfig = {
  apiKey: "AIzaSyBzNSjDqDMolBbWBx58eFDI8UYtJLjYyaw",
  authDomain: "requiemgeekshop.firebaseapp.com",
  projectId: "requiemgeekshop",
  storageBucket: "requiemgeekshop.appspot.com",
  messagingSenderId: "246133176804",
  appId: "1:246133176804:web:bc564b8c33f60fec372ff1"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PhoneLoginComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
