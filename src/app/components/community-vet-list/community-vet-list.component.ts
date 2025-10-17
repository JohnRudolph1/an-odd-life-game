// FILE: src/app/components/community-vet-list/community-vet-list.component.ts
// Dependencies: Uses VetService to load community vets; displayed at /vets route.

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Vet } from '../../models/vet.models';
import { VetService } from '../../services/vet.service';

@Component({
  selector: 'app-community-vet-list',
  templateUrl: './community-vet-list.component.html',
  styleUrls: ['./community-vet-list.component.css'],
})
export class CommunityVetListComponent implements OnInit {
  vets: Vet[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private readonly vetService: VetService,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchVets();
  }

  fetchVets(): void {
    this.loading = true;
    this.vetService.list().subscribe({
      next: (vets) => {
        this.vets = vets;
        if (!vets.length) {
          this.errorMessage = 'Community submissions will appear here once shared.';
        } else {
          this.errorMessage = '';
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Unable to load community vets right now.';
        this.snackBar.open(this.errorMessage, 'Dismiss', { duration: 4000 });
      },
    });
  }

  trackByVet(_: number, vet: Vet): string {
    return vet.id;
  }
}
