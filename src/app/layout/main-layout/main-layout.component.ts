// FILE: src/app/layout/main-layout/main-layout.component.ts
// Dependencies: Uses Angular Material layout components and AuthService; referenced by AppComponent template.

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';
import { User } from '@angular/fire/auth';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent {
  readonly user$: Observable<User | null> = this.authService.authState$;
  sidenavOpened = true;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  toggleSidenav(): void {
    this.sidenavOpened = !this.sidenavOpened;
  }

  async logout(): Promise<void> {
    await firstValueFrom(this.authService.signOut());
    await this.router.navigate(['/']);
  }
}
