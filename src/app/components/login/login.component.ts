// FILE: src/app/components/login/login.component.ts
// Dependencies: Template-driven auth form; interacts with AuthService and Router for navigation.

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly snackBar: MatSnackBar
  ) {}

  submit(): void {
    if (!this.email || !this.password) {
      this.snackBar.open('Email and password are required.', 'Dismiss', { duration: 3000 });
      return;
    }

    this.loading = true;
    this.authService.signIn(this.email, this.password).subscribe({
      next: async () => {
        this.loading = false;
        const redirectTo = this.route.snapshot.queryParamMap.get('redirectTo');
        await this.router.navigate([redirectTo || '/']);
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Unable to log in. Check your credentials.', 'Dismiss', {
          duration: 4000,
        });
      },
    });
  }
}
