import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { LoginRequest, RegisterRequest } from '../models/auth.model';
import { UserDto } from '../models/user.model';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly LOGIN_URL = `${environment.apiUrl}/auth/login`;
  private readonly REGISTER_URL = `${environment.apiUrl}/auth/register`;
  private readonly USER_STORAGE_KEY = 'currentUser';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cookieService: CookieService
  ) {}

login(payload: LoginRequest): Observable<UserDto> {
  return this.http.post<UserDto>(this.LOGIN_URL, payload, { withCredentials: true }).pipe(
    tap(user => {
      localStorage.setItem('currentUser', JSON.stringify(user));
    })
  );
}

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {

      this.cookieService.delete('token', '/');

      localStorage.removeItem(this.USER_STORAGE_KEY);
    }
  }

  getToken(): string | null {
    return isPlatformBrowser(this.platformId) ? this.cookieService.get('token') : null;
  }

  register(payload: RegisterRequest): Observable<UserDto> {
    return this.http.post<UserDto>(this.REGISTER_URL, payload);
  }

  // Call this after user updates profile
  updateCurrentUser(newUser: UserDto) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('currentUser', JSON.stringify(newUser));
    }
  }
}
