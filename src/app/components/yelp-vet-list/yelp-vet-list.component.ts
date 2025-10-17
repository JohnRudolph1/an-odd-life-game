// FILE: src/app/components/yelp-vet-list/yelp-vet-list.component.ts
// Dependencies: Uses FormBuilder and YelpService to search vets; routed from /yelp-vets.

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { YelpBusiness } from '../../models/yelp.models';
import { YelpService } from '../../services/yelp.service';

@Component({
  selector: 'app-yelp-vet-list',
  templateUrl: './yelp-vet-list.component.html',
  styleUrls: ['./yelp-vet-list.component.css'],
})
export class YelpVetListComponent {
  readonly sortOptions = [
    { value: 'distance', label: 'Distance' },
    { value: 'rating', label: 'Rating' },
    { value: 'review_count', label: 'Review count' },
    { value: 'price', label: 'Price tier (community sort)' },
  ];

  readonly form = this.fb.group({
    location: ['', Validators.required],
    sortBy: ['distance', Validators.required],
  });

  loading = false;
  results: YelpBusiness[] = [];
  errorMessage = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly yelpService: YelpService,
    private readonly snackBar: MatSnackBar
  ) {}

  search(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { location, sortBy } = this.form.getRawValue();
    if (!location || !sortBy) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const apiSort = sortBy === 'price' ? 'best_match' : sortBy;

    this.yelpService.search(location, apiSort).subscribe({
      next: (businesses) => {
        this.results =
          sortBy === 'price'
            ? [...businesses].sort((a, b) => (a.priceLevel ?? 0) - (b.priceLevel ?? 0))
            : businesses;
        if (!this.results.length) {
          this.errorMessage = 'No veterinarians found for your search.';
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Unable to reach the Yelp service. Please try again later.';
        this.snackBar.open(this.errorMessage, 'Dismiss', { duration: 4000 });
      },
    });
  }

  trackByVet(_: number, vet: YelpBusiness): string {
    return vet.id;
  }
}
