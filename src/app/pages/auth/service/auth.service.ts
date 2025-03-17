import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, map, catchError, throwError, of } from 'rxjs';
import { User } from '../../interface/User';
import { AuthResponse, CurrentUserAuth, OtpAuthResponse, ResponseMessage } from '../../response-type/Type';
import { environment } from 'src/assets/environment';
import { Router } from '@angular/router';
import { Register } from '../../interface/Register';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = environment.apiUrl;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private user$ = new BehaviorSubject<CurrentUserAuth | null>(null);
  private currentUser$ = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router:Router) {
    this.checkAuthStatus().subscribe();
    this.loadUser();
  }

  getTenantId(): string | null {
    const user = this.currentUser$.getValue();
    return user?.tenant_id || null;
  }

  getCampusId(): string | null {
    const user = this.currentUser$.getValue();
    return user?.campus_id || null;
  }

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials, {
      withCredentials: true
    }).pipe(
      tap(response => {
        if (response.status === 'pending_otp') {
          // Rediriger vers la page de vérification OTP
          this.router.navigate(['/otp'], {
            queryParams: {
              email: credentials.email,
              requires_otp: true
            }
          });
        } else if (response.status === true) {
          this.loadUser().subscribe();
        }
      })
    );
  }

  checkAuthStatus(): Observable<boolean> {
    return this.http.get<CurrentUserAuth>(`${this.apiUrl}/authenticate`, {
      withCredentials: true
    }).pipe(
      tap(response => {
        this.currentUser$.next(response.user);
        // Si l'utilisateur nécessite OTP, on ne le considère pas comme authentifié
        this.isAuthenticatedSubject.next(!response.user.requires_otp);
      }),
      map(response => !response.user.requires_otp),
      catchError(() => {
        this.currentUser$.next(null);
        this.isAuthenticatedSubject.next(false);
        return of(false);
      })
    );
  }

  verifyOtp(data: { email: string; otp: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/verify-otp`, data, {
      withCredentials: true
    }).pipe(
      tap(response => {
        if (response.status === true) {
          // Une fois l'OTP vérifié, on met à jour le statut d'authentification
          this.loadUser().subscribe();
          this.isAuthenticatedSubject.next(true);
          this.router.navigate(['/index']); // Redirection vers l'index
        }
      }),
      catchError(this.handleError)
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, {
      withCredentials: true
    }).pipe(
      tap(() => {
        this.clearCookies();
        this.currentUser$.next(null);
        this.isAuthenticatedSubject.next(false);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else if (error.error?.message) {
      errorMessage = error.error.message;
    }
    return throwError(() => new Error(errorMessage));
  }

  getUser(): Observable<CurrentUserAuth> {
    return this.http.get<CurrentUserAuth>(`${this.apiUrl}/authenticate`, {
      withCredentials: true
    }).pipe(
      tap(user => this.user$.next(user)),
      catchError(error => {
        this.user$.next(null);
        return throwError(() => error);
      })
    );
  }

  checkOtp(email: string | null) {
    return this.http.post<OtpAuthResponse>(`${this.apiUrl}/check-otp`, { email }, {
      withCredentials: true
    }).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  private clearCookies(): void {
    document.cookie = 'jwt=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;';
  }

  private loadUser() {
    return this.http.get<CurrentUserAuth>(`${this.apiUrl}/authenticate`, {
      withCredentials: true
    }).pipe(
      tap(currentUserAuth => {
        this.currentUser$.next(currentUserAuth.user);
        this.isAuthenticatedSubject.next(true);
      }),
      catchError(error => {
        this.currentUser$.next(null);
        this.isAuthenticatedSubject.next(false);
        return throwError(() => error);
      })
    );
  }

  forgotPassword(email: string): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(`${this.apiUrl}/forgot-password`, { email });
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser$.asObservable();
  }

  resetPassword(token: string,email: string, password: string, password_confirmation: string): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(`${this.apiUrl}/reset-password`, {
      token,
      email,
      password,
      password_confirmation
    });
  }

  // retourne l'objet User
  getCurrentUserSync(): User | null {
    return this.currentUser$.getValue();
  }

  register(registerModel:Register): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(`${this.apiUrl}/register`,registerModel)
  }
}
