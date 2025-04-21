import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Address } from '../models/address.model';
import { User } from '../models/user.model';

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

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<User> {
    const mockUser: User = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      userName: 'johndoe',
      email: 'johndoe@example.com',
      phone: '123-456-7890',
      addresses: this.addresses,
    };

    return of(mockUser);
  }

  getAddresses(): Observable<Address[]> {
    return of(this.addresses);
  }
}
