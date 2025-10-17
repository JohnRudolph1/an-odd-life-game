// FILE: src/app/services/auth.service.ts
// Dependencies: Wraps AngularFire Auth for email/password flows; consumed by AuthGuard and auth-related components.

import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  user,
} from '@angular/fire/auth';
import { from, map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly authState$: Observable<User | null> = user(this.auth);

  constructor(private readonly auth: Auth) {}

  signUp(email: string, password: string): Observable<User> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      map((credential) => credential.user)
    );
  }

  signIn(email: string, password: string): Observable<User> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      map((credential) => credential.user)
    );
  }

  signOut(): Observable<void> {
    return from(signOut(this.auth));
  }
}
