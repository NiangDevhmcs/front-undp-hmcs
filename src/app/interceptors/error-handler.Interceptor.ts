import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpErrorResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../pages/auth/service/auth.service';
import { Router } from '@angular/router';


@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          if (err.status === 429 || err.status === 500) {
            this.authService.logout();
            // Vérification si la route existe avant de tenter la redirection
            const routeExists = this.router.config.some(route => route.path === 'acces-denied');
            if (routeExists) {
              this.router.navigate(['/acces-denied']);
            } else {
              return err;
            }
          }
        },
      })
    );
}
}