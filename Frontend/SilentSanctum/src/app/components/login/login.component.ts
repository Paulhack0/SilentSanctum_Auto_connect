import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHybridService } from 'src/app/services/auth-hybrid.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(public auth: AuthHybridService, private router: Router) {}

  login(): void {
    // Active Auth0
    this.auth.setAuth0Mode(true);
    this.auth.loginWithRedirect();
  }
}

