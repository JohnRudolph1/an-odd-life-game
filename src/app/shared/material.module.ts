// FILE: src/app/shared/material.module.ts
// Dependencies: Re-exports Angular Material modules used across components; imported by AppModule.

import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

const MATERIAL_MODULES = [
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatSelectModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatDividerModule,
  MatChipsModule,
  MatMenuModule,
  MatTooltipModule,
];

@NgModule({
  exports: MATERIAL_MODULES,
})
export class MaterialModule {}
