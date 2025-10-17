// FILE: src/app/services/vet.service.ts
// Dependencies: Communicates with Express community API via HttpClient; consumed by community components.

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Vet } from '../models/vet.models';

interface ServicePayload {
  serviceName: string;
  price: number;
  name?: string;
  address?: string;
  phone?: string;
}

interface RatingPayload {
  rating: number;
}

@Injectable({ providedIn: 'root' })
export class VetService {
  private readonly baseUrl = `${environment.apiBaseUrl}/vets`;

  constructor(private readonly http: HttpClient) {}

  list(): Observable<Vet[]> {
    return this.http.get<Vet[]>(this.baseUrl);
  }

  getById(id: string): Observable<Vet> {
    return this.http.get<Vet>(`${this.baseUrl}/${id}`);
  }

  create(vet: Partial<Vet>): Observable<Vet> {
    return this.http.post<Vet>(this.baseUrl, vet);
  }

  addServicePrice(id: string, payload: ServicePayload): Observable<Vet> {
    return this.http.post<Vet>(`${this.baseUrl}/${id}/services`, payload);
  }

  addRating(id: string, payload: RatingPayload): Observable<Vet> {
    return this.http.post<Vet>(`${this.baseUrl}/${id}/ratings`, payload);
  }
}
