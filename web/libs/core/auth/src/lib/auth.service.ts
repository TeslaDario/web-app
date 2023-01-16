import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

interface AuthLoginResult {
  token: string;
  expiresIn: number;
}
interface AuthLogoutResult {
  success: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthLoginResult> {
    return this.http
      .post<AuthLoginResult>('/auth/login', { email, password })
      .pipe(tap(this.setSession));
  }

  logout(): Observable<AuthLogoutResult> {
    return this.http
      .post<AuthLogoutResult>('/auth/logout', {})
      .pipe(tap(this.removeSession));
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expires_at');

    if (token && expiration) {
      return JSON.parse(expiration) > +new Date();
    }
    return false;
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  private setSession({ token, expiresIn }: AuthLoginResult): void {
    const expiresAt = +new Date() + expiresIn;
    console.log(+new Date(), expiresIn, expiresAt);

    localStorage.setItem('token', token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt));
  }

  private removeSession(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }
}
