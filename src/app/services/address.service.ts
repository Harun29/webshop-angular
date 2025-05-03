import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import {Address, AddressDto, UpdateAddressRequest } from '../models/address.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AddressService {
  private readonly ADD_ADDRESS_URL = `${environment.apiUrl}/addresses`;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  saveAddress(address: Address): Observable<Address> {
    if (address.id && address.id > 0) {
      return this.http.put<AddressDto>(`${this.ADD_ADDRESS_URL}/${address.id}`, address, { withCredentials: true })
        .pipe(catchError(this.handleError));
    } else {
      return this.http.post<Address>(this.ADD_ADDRESS_URL, address, { withCredentials: true })
        .pipe(catchError(this.handleError));
    }
  }


  getAddresses(): Observable<AddressDto[]> {
    return this.http.get<AddressDto[]>(this.ADD_ADDRESS_URL)
      .pipe(catchError(this.handleError));
  }


  getSavedAddress(): Observable<AddressDto | null> {
    if (isPlatformBrowser(this.platformId)) {
      const address = localStorage.getItem('address');
      return of(address ? (JSON.parse(address) as AddressDto) : null);
    }
    return of(null);
  }

  saveAddressToLocal(address: AddressDto): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('address', JSON.stringify(address));
    }
  }

  clearSavedAddress(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('address');
    }
  }

  deleteAddress(addressId: number): Observable<void> {
    return this.http.delete<void>(`${this.ADD_ADDRESS_URL}/${addressId}` , { withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse): Observable<never> {
    let userFriendlyMessage = 'An unexpected error occurred.';
    if (error.error) {
      const err = error.error;
      if (err.message) {
        userFriendlyMessage = err.message;
      }
      if (err.details && typeof err.details === 'object') {
        const details = Object.entries(err.details).map(([field, msg]) => `${field}: ${msg}`).join('\n');
        userFriendlyMessage += `\nDetails:\n${details}`;
      }
    }
    return throwError(() => new Error(userFriendlyMessage));
  }
}
