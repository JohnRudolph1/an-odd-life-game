// FILE: src/app/models/vet.models.ts
// Dependencies: Declares community vet interfaces; used by VetService and related components.

export interface VetServicePricing {
  serviceName: string;
  price: number;
  submittedAt: string;
}

export interface VetRating {
  rating: number;
  submittedAt: string;
}

export interface Vet {
  id: string;
  name: string;
  address: string;
  phone?: string;
  averageRating: number;
  ratings: VetRating[];
  services: VetServicePricing[];
  source?: 'yelp' | 'community';
}

export interface PetService {
  key: string;
  label: string;
}
