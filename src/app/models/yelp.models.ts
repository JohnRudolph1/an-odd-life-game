// FILE: src/app/models/yelp.models.ts
// Dependencies: Defines Yelp API response interfaces; consumed by YelpService and components displaying Yelp data.

export interface YelpCategory {
  alias: string;
  title: string;
}

export interface YelpLocation {
  address1: string;
  address2?: string;
  address3?: string;
  city: string;
  zip_code: string;
  country: string;
  state: string;
  display_address: string[];
}

export interface YelpCoordinates {
  latitude: number;
  longitude: number;
}

export interface YelpBusiness {
  id: string;
  name: string;
  rating: number;
  review_count: number;
  price?: string;
  phone?: string;
  display_phone?: string;
  url?: string;
  location: YelpLocation;
  distance: number;
  categories: YelpCategory[];
  coordinates?: YelpCoordinates;
  priceLevel?: number;
}

export interface YelpSearchResponse {
  businesses: YelpBusiness[];
  total: number;
  region: {
    center: YelpCoordinates;
  };
}
