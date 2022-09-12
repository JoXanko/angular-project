import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { LoginComponent } from './components/login/login.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';


/*const firebaseConfig = {
  apiKey: 'AIzaSyDYOI-ryBmzkJqcBOIM8SqozvMgCwUGtls',
  authDomain: 'angular-project-rwa.firebaseapp.com',
  projectId: 'angular-project-rwa',
  storageBucket: 'angular-project-rwa.appspot.com',
  messagingSenderId: '577775773036',
  appId: '1:577775773036:web:ca465b09d32c96bc983f49',
  measurementId: 'G-1QLYHM9FC4',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);*/

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFireAuthModule,
    /*provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())*/
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
