// FILE: src/app/components/vet-detail/vet-detail.component.ts
// Dependencies: Combines VetService and YelpService data for a single vet; used at /vets/:id route.

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { combineLatest, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { YelpBusiness } from '../../models/yelp.models';
import { Vet } from '../../models/vet.models';
import { VetService } from '../../services/vet.service';
import { YelpService } from '../../services/yelp.service';

@Component({
  selector: 'app-vet-detail',
  templateUrl: './vet-detail.component.html',
  styleUrls: ['./vet-detail.component.css'],
})
export class VetDetailComponent implements OnInit {
  vet: Vet | null = null;
  yelpBusiness: YelpBusiness | null = null;
  loading = false;
  errorMessage = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly vetService: VetService,
    private readonly yelpService: YelpService,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.errorMessage = 'Veterinarian not found.';
      return;
    }
    this.fetchVet(id);
  }

  fetchVet(id: string): void {
    this.loading = true;

    combineLatest([
      this.vetService
        .getById(id)
        .pipe(catchError(() => of(null))),
      this.yelpService
        .getBusiness(id)
        .pipe(catchError(() => of(null))),
    ]).subscribe({
      next: ([vet, yelp]) => {
        this.vet = vet;
        this.yelpBusiness = yelp;
        if (!vet) {
          this.errorMessage =
            'Community data is not available yet. Be the first to share pricing!';
        } else {
          this.errorMessage = '';
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Unable to load veterinarian details right now.';
        this.snackBar.open(this.errorMessage, 'Dismiss', { duration: 4000 });
      },
    });
  }

  getAverageRating(): number {
    if (!this.vet || !this.vet.ratings.length) {
      return 0;
    }
    const total = this.vet.ratings.reduce((sum, rating) => sum + rating.rating, 0);
    return total / this.vet.ratings.length;
  }
}
