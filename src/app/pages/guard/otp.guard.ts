import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';
import { OtpStateService } from '../auth/service/OtpState.service';
@Injectable({
  providedIn: 'root'
})
export class OtpGuard implements CanActivate {

  constructor(
    private otpStateService: OtpStateService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const email = this.otpStateService.getEmail();
    const requiresOtp = this.otpStateService.getRequiresOtp();
    console.log();
    
    if (email && requiresOtp) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
