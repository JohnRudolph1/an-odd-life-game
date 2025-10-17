// FILE: src/app/app-routing.module.ts
// Dependencies: Imports Angular Router, feature components, AuthGuard; used by AppModule for navigation configuration.

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { YelpVetListComponent } from './components/yelp-vet-list/yelp-vet-list.component';
import { CommunityVetListComponent } from './components/community-vet-list/community-vet-list.component';
import { VetDetailComponent } from './components/vet-detail/vet-detail.component';
import { AddPriceComponent } from './components/add-price/add-price.component';
import { RateVetComponent } from './components/rate-vet/rate-vet.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'yelp-vets', component: YelpVetListComponent },
  { path: 'vets', component: CommunityVetListComponent },
  { path: 'vets/:id', component: VetDetailComponent },
  {
    path: 'vets/:id/add-price',
    component: AddPriceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'vets/:id/rate',
    component: RateVetComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
