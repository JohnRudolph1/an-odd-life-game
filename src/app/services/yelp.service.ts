// FILE: src/app/services/yelp.service.ts
// Dependencies: Uses HttpClient to call backend Yelp proxy; consumed by YelpVetListComponent and VetDetailComponent.

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '../../environments/environment';
import { YelpBusiness, YelpSearchResponse } from '../models/yelp.models';

@Injectable({ providedIn: 'root' })
export class YelpService {
  private readonly baseUrl = `${environment.apiBaseUrl}/yelp`;

  constructor(private readonly http: HttpClient) {}

  search(location: string, sortBy: string): Observable<YelpBusiness[]> {
    const params = new HttpParams().set('location', location).set('sort_by', sortBy);

    return this.http
      .get<YelpSearchResponse>(`${this.baseUrl}/search`, { params })
      .pipe(
        map((response) =>
          response.businesses.map((business) => ({
            ...business,
            priceLevel: business.price ? business.price.length : 0,
          }))
        )
      );
  }

  getBusiness(id: string): Observable<YelpBusiness> {
    return this.http
      .get<YelpBusiness>(`${this.baseUrl}/business/${id}`)
      .pipe(
        map((business) => ({
          ...business,
          priceLevel: business.price ? business.price.length : 0,
        }))
      );
  }
}
