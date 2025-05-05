import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, switchMap, catchError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private http: HttpClient,
        private router: Router
    ) {}

    private apiUrl = `${environment.apiUrl}/auth`;

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const publicEndpoints = ['/products', '/login', '/register'];

        if (publicEndpoints.some(endpoint => req.url.includes(endpoint))) {
            return next.handle(req);
        }

        const clonedRequest = req.clone({ withCredentials: true });

        return next.handle(clonedRequest).pipe(
            catchError((err: HttpErrorResponse) => {
                if (err.status === 401) {
                    return this.http.post(this.apiUrl+'/refresh', {}, { withCredentials: true }).pipe(
                        switchMap(() => next.handle(clonedRequest)),
                        catchError(() => {
                            this.authService.logout();
                            this.router.navigate(['/login']);
                            return throwError(() => err);
                        })
                    );
                }
                return throwError(() => err);
            })
        );
    }
}
