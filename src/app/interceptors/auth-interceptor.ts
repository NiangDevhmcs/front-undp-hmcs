import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../pages/auth/service/auth.service';
import { LanguageService } from '../pages/auth/service/Language.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private laguageService:LanguageService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const modifiedRequest = request.clone({
      withCredentials: true,
      setHeaders: {
        'Accept-Language': this.laguageService.getLocale()
      }
    });

    return next.handle(modifiedRequest);
  }
}
