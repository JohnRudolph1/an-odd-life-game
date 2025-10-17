// FILE: src/app/components/rate-vet/rate-vet.component.ts
// Dependencies: Template-driven rating form; uses VetService for submission and ActivatedRoute for vet context.

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Vet } from '../../models/vet.models';
import { VetService } from '../../services/vet.service';

@Component({
  selector: 'app-rate-vet',
  templateUrl: './rate-vet.component.html',
  styleUrls: ['./rate-vet.component.css'],
})
export class RateVetComponent implements OnInit {
  vet: Vet | null = null;
  ratingValue = 5;
  loading = false;
  saving = false;
  private vetId = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly vetService: VetService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.snackBar.open('Vet not found.', 'Dismiss', { duration: 4000 });
      return;
    }
    this.vetId = id;
    this.fetchVet(id);
  }

  fetchVet(id: string): void {
    this.loading = true;
    this.vetService.getById(id).subscribe({
      next: (vet) => {
        this.vet = vet;
        this.loading = false;
      },
      error: () => {
        this.vetService
          .create({
            id,
            name: 'Community submitted veterinarian',
            address: 'Unknown address',
          })
          .subscribe({
            next: (vet) => {
              this.vet = vet;
              this.loading = false;
              this.snackBar.open('Created a placeholder vet entry for community ratings.', 'Dismiss', {
                duration: 4000,
              });
            },
            error: () => {
              this.loading = false;
              this.snackBar.open('Unable to prepare vet for rating.', 'Dismiss', { duration: 4000 });
            },
          });
      },
    });
  }

  submit(): void {
    if (!this.vet) {
      return;
    }

    if (this.ratingValue < 1 || this.ratingValue > 5) {
      this.snackBar.open('Rating must be between 1 and 5.', 'Dismiss', { duration: 3000 });
      return;
    }

    this.saving = true;
    this.vetService
      .addRating(this.vetId, { rating: this.ratingValue })
      .subscribe({
        next: () => {
          this.saving = false;
          this.snackBar.open('Thanks for sharing your rating!', 'Dismiss', { duration: 3000 });
          this.router.navigate(['/vets', this.vetId]);
        },
        error: () => {
          this.saving = false;
          this.snackBar.open('Unable to submit rating right now.', 'Dismiss', { duration: 4000 });
        },
      });
  }
}
