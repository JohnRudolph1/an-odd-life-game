// FILE: src/app/components/add-price/add-price.component.ts
// Dependencies: Template-driven form to submit pricing; uses VetService and ActivatedRoute for context.

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PetService, Vet } from '../../models/vet.models';
import { VetService } from '../../services/vet.service';

@Component({
  selector: 'app-add-price',
  templateUrl: './add-price.component.html',
  styleUrls: ['./add-price.component.css'],
})
export class AddPriceComponent implements OnInit {
  vet: Vet | null = null;
  loading = false;
  saving = false;
  services: PetService[] = [
    { key: 'exam', label: 'Wellness exam' },
    { key: 'vaccination', label: 'Vaccination' },
    { key: 'spay_neuter', label: 'Spay/Neuter' },
    { key: 'dental_cleaning', label: 'Dental cleaning' },
    { key: 'emergency_visit', label: 'Emergency visit' },
  ];

  selectedService = this.services[0].label;
  priceValue: number | null = null;
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
    this.loadVet(id);
  }

  loadVet(id: string): void {
    this.loading = true;
    this.vetService.getById(id).subscribe({
      next: (vet) => {
        this.vet = vet;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.vet = {
          id,
          name: 'Community submitted veterinarian',
          address: 'Unknown address',
          phone: undefined,
          averageRating: 0,
          ratings: [],
          services: [],
          source: 'community',
        };
        this.snackBar.open('No community data yet. Be the first to add pricing!', 'Dismiss', {
          duration: 4000,
        });
      },
    });
  }

  submit(): void {
    if (!this.vet) {
      return;
    }

    const price = Number(this.priceValue);
    if (!this.selectedService || !price || price <= 0) {
      this.snackBar.open('Please enter a positive price.', 'Dismiss', { duration: 3000 });
      return;
    }

    this.saving = true;
    this.vetService
      .addServicePrice(this.vetId, {
        serviceName: this.selectedService,
        price,
        name: this.vet.name,
        address: this.vet.address,
        phone: this.vet.phone,
      })
      .subscribe({
        next: () => {
          this.saving = false;
          this.snackBar.open('Price submitted! Thank you.', 'Dismiss', { duration: 3000 });
          this.router.navigate(['/vets', this.vetId]);
        },
        error: () => {
          this.saving = false;
          this.snackBar.open('Unable to submit price right now.', 'Dismiss', {
            duration: 4000,
          });
        },
      });
  }
}
