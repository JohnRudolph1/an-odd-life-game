// FILE: src/app/app.module.ts
// Dependencies: Imports Angular core modules, routing, MaterialModule, Firebase providers, and feature components; consumed by main.ts bootstrap.

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomeComponent } from './components/home/home.component';
import { YelpVetListComponent } from './components/yelp-vet-list/yelp-vet-list.component';
import { CommunityVetListComponent } from './components/community-vet-list/community-vet-list.component';
import { VetDetailComponent } from './components/vet-detail/vet-detail.component';
import { AddPriceComponent } from './components/add-price/add-price.component';
import { RateVetComponent } from './components/rate-vet/rate-vet.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PositiveNumberDirective } from './validators/positive-number.directive';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomeComponent,
    YelpVetListComponent,
    CommunityVetListComponent,
    VetDetailComponent,
    AddPriceComponent,
    RateVetComponent,
    LoginComponent,
    SignupComponent,
    PositiveNumberDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
