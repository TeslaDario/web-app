import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  template: `
    <form [formGroup]="form">
      <fieldset>
        <legend>Login</legend>
        <div class="form-field">
          <label>Email:</label>
          <input name="email" formControlName="email" />
        </div>
        <div class="form-field">
          <label>Password:</label>
          <input name="password" formControlName="password" type="password" />
        </div>
      </fieldset>
      <div class="form-buttons">
        <button
          class="button button-primary"
          [disabled]="!form.valid || loading"
          (click)="submit()"
        >
          Login
        </button>
      </div>
    </form>
  `,
})
export class LoginComponent {
  form: FormGroup;
  loading!: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit(): void {
    if (!this.form.valid || this.loading) {
      return;
    }

    const { email, password } = this.form.value;
    this.loading = true;

    this.authService
      .login(email, password)
      .pipe(catchError(async (err) => this.handleError(err)))
      .subscribe((res) => {
        this.loading = false;
        if (res?.token) {
          this.router.navigate(['/'], { replaceUrl: true });
        }
      });
  }

  private handleError(err: HttpErrorResponse): void {
    if (err.status === 304) {
      this.router.navigate(['/'], { replaceUrl: true });
      return;
    }

    alert(`Error: ${err.status}: ${err.statusText}`);
    this.loading = false;
  }
}
