import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from '../models/user.model';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUrl = `${environment.apiUrl}/users/user`;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  updateUser(id: number, user: UserDto): Observable<UserDto> {
    return this.http.put<{ user: UserDto }>(`${this.apiUrl}/${id}`, user)
      .pipe(map(response => response.user));
  }

  getCurrentUser(): Observable<UserDto> {
    return this.http.get<{ user: UserDto }>(
      `${this.apiUrl}/me`,
    ).pipe(map(res => res.user));
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}
