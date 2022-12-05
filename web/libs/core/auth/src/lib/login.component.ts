import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
          [disabled]="!form.valid"
          (click)="login()"
        >
          Login
        </button>
      </div>
    </form>
  `,
})
export class LoginComponent {
  form: FormGroup;

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

  login(): void {
    const { email, password } = this.form.value;

    if (email && password) {
      this.authService.login(email, password).subscribe(() => {
        console.log('User is logged in');
        this.router.navigateByUrl('/');
      });
    }
  }
}
