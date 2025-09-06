import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService, User } from '@auth0/auth0-angular';
import { map } from 'rxjs/operators';

export interface HybridUser {
  email: string;
  name: string;
  sub: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthHybridService {
  private useAuth0 = false; // false = mode visiteur
  private mockUser: HybridUser = {
    email: 'visitor@silent.com',
    name: 'Visitor',
    sub: 'visitor-id-1',
  };

  constructor(private auth0: AuthService) {}

  setAuth0Mode(active: boolean) {
    this.useAuth0 = active;
  }

  /** Retourne un Observable, PAS une fonction */
  isAuthenticated$: Observable<boolean> = this.useAuth0
    ? this.auth0.isAuthenticated$
    : of(true);

  /** Retourne un Observable User ou HybridUser */
  user$: Observable<User | HybridUser | null> = this.useAuth0
    ? this.auth0.user$.pipe(
      map((u) => u ?? null) // remplace undefined par null
    )
  : of(this.mockUser);

  loginWithRedirect(): void {
    if (this.useAuth0) this.auth0.loginWithRedirect();
  }

  logout(): void {
    if (this.useAuth0)
      this.auth0.logout({ logoutParams: { returnTo: window.location.origin } });
  }
}

