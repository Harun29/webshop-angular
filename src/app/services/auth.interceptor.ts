import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private http: HttpClient,
        private router: Router
    ) {}

    private apiUrl = `${environment.apiUrl}/auth`;
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const publicEndpoints = ['/products', '/login', '/register'];
        if (publicEndpoints.some(endpoint => req.url.includes(endpoint))) {
            return next.handle(req);
        }

        const clonedRequest = req.clone({ withCredentials: true });

        return next.handle(clonedRequest).pipe(
            catchError((err: HttpErrorResponse) => {
                if (err.status === 401) {
                    if (!this.isRefreshing) {
                        this.isRefreshing = true;
                        this.refreshTokenSubject.next(false);

                        return this.http.post(`${this.apiUrl}/refresh`, {}, { withCredentials: true }).pipe(
                            switchMap(() => {
                                this.isRefreshing = false;
                                this.refreshTokenSubject.next(true);
                                return next.handle(clonedRequest);
                            }),
                            catchError(refreshErr => {
                                this.isRefreshing = false;
                                this.authService.logout();
                                this.router.navigate(['/login']);
                                return throwError(() => refreshErr);
                            })
                        );
                    } else {
                        return this.refreshTokenSubject.pipe(
                            filter(status => status === true),
                            take(1),
                            switchMap(() => next.handle(clonedRequest))
                        );
                    }
                }

                return throwError(() => err);
            })
        );
    }
}
