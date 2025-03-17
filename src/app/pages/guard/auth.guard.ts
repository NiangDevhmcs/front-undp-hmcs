import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, catchError, map, of, switchMap, take } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';
import { User } from '../interface/User';

@Injectable({
  providedIn: 'root'
})
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
//     return this.authService.getCurrentUser().pipe(
//       switchMap(user => {
//         if (!user) {
//           this.router.navigate(['/login']);
//           return of(false);
//         }

//         // Si l'utilisateur requiert OTP et n'est pas sur la page de vérification OTP
//         if (user.requires_otp && !next.routeConfig?.path?.includes('otp')) {
//           this.router.navigate(['/otp']);
//           return of(false);
//         }
//         this.router.navigate(['/index']);
//         return of(true);
//       }),
//       catchError(() => {
//         this.router.navigate(['/login']);
//         return of(false);
//       })
//     );
//   }
// }







export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
  requiredOtp:boolean=false;

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {

    return this.authService.checkAuthStatus().pipe(
      map((response) => {        
        if (response ) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError((error) => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
  

}


// console.log(this.authService.getCurrentUserSync()?.requires_otp);
    
//     // this.requiredOtp = this.authService.getCurrentUserSync()?.requires_otp;