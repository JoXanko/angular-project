import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { LoginComponent } from './components/login/login.component';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

// import { MainPageComponent } from './components/main-page/main-page.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import { HeaderComponent } from './components/header/header.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCarouselModule } from 'ng-mat-carousel';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { LostPetComponent } from './components/lost-pet/lost-pet.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { GoogleMapsModule } from '@angular/google-maps';
import { FindPetComponent } from './components/find-pet/find-pet.component';
// import { UserEffects } from './store/user/user.effects';
// import { PetReducer } from './store/petOLD/pet.reducer';
import { AppState } from './app.state';
import { petReducer } from './store/pet/pet.reducer';
import { PetEffects } from './store/pet/pet.effects';
import { breedReducer } from './store/breed/breed.reducer';
import { BreedEffects } from './store/breed/breed.effects';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    routingComponents,
    LostPetComponent,
    FindPetComponent,
  ],
  imports: [
    MatCarouselModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFireAuthModule,
    MatSnackBarModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    GoogleMapsModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatRadioModule,
    MatTooltipModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,

    StoreModule.forRoot<AppState>({ pets: petReducer, breeds: breedReducer }),
    EffectsModule.forRoot([PetEffects, BreedEffects]),

    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
