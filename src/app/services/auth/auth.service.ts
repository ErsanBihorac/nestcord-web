import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { catchError, Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  isAuthenticated(): Observable<boolean> {
    const url = `${environment.apiUrl}/auth/me`;
    return this.http
      .get(url, {
        withCredentials: true,
      })
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  registerWithPassword(name: string, email: string, password: string) {
    const url = `${environment.apiUrl}/auth/register`;
    const body = {
      name,
      email,
      password,
    };

    return this.http.post(url, body, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  loginWithPassword(email: string, password: string) {
    const url = `${environment.apiUrl}/auth/login`;
    const body = {
      email,
      password,
    };

    const response = this.http.post(url, body, {
      withCredentials: true,
    });
    console.log(response);
    return response;
  }

  async loginWithGoogle() {
    const url = `${environment.apiUrl}/auth/google`;
    console.log(`opening url: ${url}`);
    window.location.href = url;
  }

  async loginWithGithub() {
    const url = `${environment.apiUrl}/auth/github`;
    console.log(`opening url: ${url}`);
    window.location.href = url;
  }
}
