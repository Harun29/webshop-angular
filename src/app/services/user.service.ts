import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Address } from '../models/address.model';
import { User } from '../models/user.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly addresses: Address[] = [
    {
      id: 1,
      country: 'USA',
      city: 'New York',
      postalCode: 10001,
      address: '123 Main St',
    },
    {
      id: 2,
      country: 'Canada',
      city: 'Toronto',
      postalCode: 123456,
      address: '456 Elm St',
    },
    {
      id: 3,
      country: 'UK',
      city: 'London',
      postalCode: 123456,
      address: '789 Oak St',
    },
  ];

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  login(obj: {username: string, password: string}): Observable<any> {
    return this.http.post('/api/login', obj);
  }

  getCurrentUser(): Observable<User | null> {
    if (isPlatformBrowser(this.platformId)) {
      const user = sessionStorage.getItem('user');
      if (user) {
        return of(JSON.parse(user) as User);
      } else {
        return of(null);
      }
    } else {
      throw of(null);
    }
  }

  getAddresses(): Observable<Address[]> {
    return of(this.addresses);
  }
}
