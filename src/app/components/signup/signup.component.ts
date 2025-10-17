// FILE: src/app/components/signup/signup.component.ts
// Dependencies: Template-driven signup form; uses AuthService to register new users and navigates with Router.

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  email = '';
  password = '';
  confirmPassword = '';
  loading = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {}

  submit(): void {
    if (!this.email || !this.password || !this.confirmPassword) {
      this.snackBar.open('All fields are required.', 'Dismiss', { duration: 3000 });
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.snackBar.open('Passwords do not match.', 'Dismiss', { duration: 3000 });
      return;
    }

    this.loading = true;
    this.authService.signUp(this.email, this.password).subscribe({
      next: async () => {
        this.loading = false;
        await this.router.navigate(['/']);
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Unable to sign up. Please try again.', 'Dismiss', { duration: 4000 });
      },
    });
  }
}
