import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHybridService, HybridUser } from 'src/app/services/auth-hybrid.service';
import { BackendConnectionService } from 'src/app/services/backend-connection.service';
import { User } from '@auth0/auth0-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  profileJson: User | HybridUser | null = null;

  constructor(
    public auth: AuthHybridService,
    private backendService: BackendConnectionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((profile) => {
      this.profileJson = profile;
      console.log('Profil:', profile);

      if (profile) {
        this.backendService.login(profile).subscribe((response) => {
          console.log('Backend login response:', response);
          localStorage.setItem('username', response.username);
          localStorage.setItem('LoginId', response.loginId);
        });
      }
    });
  }

  goToPosts() {
    this.router.navigate(['/posts']);
  }
}

