import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/auth';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-home',
  template: `
    <p>Home works</p>
    <p><button routerLink="login">to login</button></p>
    <p><button (click)="logout()">logout</button></p>
  `,
})
export class HomeComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService
      .logout()
      .pipe(
        catchError((err) => {
          if (err.status === 401 || err.status === 403) {
            this.goToLogin();
          }
          throw err;
        })
      )
      .subscribe(() => this.goToLogin());
  }

  private goToLogin(): void {
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
