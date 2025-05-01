import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { LoginRequest, LoginResponseDto, RegisterRequest } from '../models/auth.model';
import { UserDto } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly LOGIN_URL = '/auth/login';
  private readonly REGISTER_URL = '/auth/register';

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  login(payload: LoginRequest): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(this.LOGIN_URL, payload).pipe(
      tap(response => {
        if (isPlatformBrowser(this.platformId)) {
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('user', JSON.stringify(response.user));
        }
      })
    );
  }

  register(payload: RegisterRequest): Observable<UserDto> {
    return this.http.post<UserDto>(this.REGISTER_URL, payload);
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
    }
  }

  getCurrentUser(): Observable<UserDto | null> {
    if (isPlatformBrowser(this.platformId)) {
      const user = sessionStorage.getItem('user');
      return of(user ? (JSON.parse(user) as UserDto) : null);
    }
    return of(null);
  }

  getToken(): string | null {
    return isPlatformBrowser(this.platformId) ? sessionStorage.getItem('token') : null;
  }
}
