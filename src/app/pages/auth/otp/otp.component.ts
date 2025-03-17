import { NgIf, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../service/auth.service';
import { OtpStateService } from '../service/OtpState.service';
import { Router } from '@angular/router';
import { filter, map, of, switchMap, take } from 'rxjs';

@Component({
  selector: 'vex-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NgIf,
    NgForOf,
    MatButtonModule,
    MatProgressBarModule,
    MatSnackBarModule,
    FormsModule
  ]
})
// export class OtpComponent implements OnInit{

//   email: string | null = '';
//   constructor(
//     private authService:AuthService,
//     private otpStateService: OtpStateService,
//   ){
//     this.email = otpStateService.getEmail();    
//   }
//   ngOnInit(): void {
//     this.maskEmail();
//   }
  
//   mainFrameLoading = false;
//   otp: string[] = ['', '', '', '', '', ''];
//   loading = false;
//   otpControls = new Array(6);

//   handleChange(event: any, index: number): void {
//     const value = event.target.value;
//     if (value.length <= 1 && !isNaN(Number(value))) {
//       this.otp[index] = value;
//       if (value && index < 5) {
//         document.getElementById(`otp-${index + 1}`)?.focus();
//       }
//     }
//   }

//   handleKeyDown(event: KeyboardEvent, index: number): void {
//     if (event.key === 'Backspace' && !this.otp[index] && index > 0) {
//       document.getElementById(`otp-${index - 1}`)?.focus();
//     }
//   }

//     maskEmail(): string {
//     if (!this.email) return '';
    
//     const [localPart, domain] = this.email.split('@');
//     if (!domain) return '';

//     const visiblePart = localPart.slice(0, 3);
//     const hiddenPart = '*'.repeat(7);
    
//     return `${visiblePart}${hiddenPart}@${domain}`;
//   }

//   isValidOTP(): boolean {
//     return this.otp.join('').length === 6;
//   }

//   verify() {
//     // Concatène tous les chiffres des inputs pour former le code OTP complet
//     const otpValue = this.otpControls.map(control => control.value);
//     console.log('Code OTP saisi :', otpValue);
//   }
// }

export class OtpComponent implements OnInit {
  email: string | null = ""
  mainFrameLoading = false
  otp: string[] = ["", "", "", "", "", ""]
  loading = false
  otpControls = new Array(6)
  errorMessage!:string;
  existErrorMessage:boolean = false;

  constructor(
    private authService: AuthService,
    private otpStateService: OtpStateService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.email = otpStateService.getEmail()
  }

  ngOnInit(): void {
    this.maskEmail()
  }

  handleChange(event: any, index: number): void {
    const input = event.target
    const value = input.value

    // Assurez-vous que seuls des chiffres sont entrés
    if (/^\d*$/.test(value)) {
      this.otp[index] = value
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`)?.focus()
      }
    } else {
      // Si ce n'est pas un chiffre, effacez l'entrée
      input.value = ""
    }
  }

  handleKeyDown(event: KeyboardEvent, index: number): void {
    if (event.key === "Backspace" && !this.otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus()
    }
  }

  maskEmail(): string {
    if (!this.email) return ""

    const [localPart, domain] = this.email.split("@")
    if (!domain) return ""

    const visiblePart = localPart.slice(0, 3)
    const hiddenPart = "*".repeat(7)

    return `${visiblePart}${hiddenPart}@${domain}`
  }

  isValidOTP(): boolean {
    return this.otp.every((digit) => /^\d$/.test(digit))
  }

  // verify() {
  //   const otpValue = this.otp.join("");
    
  //   if (otpValue.length !== 6) {
  //     this.showMessage('Le code OTP doit contenir 6 chiffres');
  //     return;
  //   }
  
  //   if (this.email) {
  //     this.authService.verifyOtp({ email: this.email, otp: otpValue }).pipe(
  //       // On attend que le loadUser soit terminé avant de continuer
  //       switchMap(response => {
  //         if (response.status) {
  //           // On attend que le statut d'authentification soit mis à jour
  //           return this.authService.isAuthenticated$.pipe(
  //             filter(isAuthenticated => isAuthenticated),
  //             take(1),
  //             map(() => response)
  //           );
  //         }
  //         return of(response);
  //       })
  //     ).subscribe({
  //       next: (response) => {
  //         if (response.status) {
  //           this.otpStateService.clearOtpState();
  //           this.showMessage(response.message);

  //           console.log("// On vérifie que l'authentification est bien établie avant de rediriger");
            
  //           // On vérifie que l'authentification est bien établie avant de rediriger
  //           this.authService.getCurrentUserSync();
  //           this.router.navigate(['/index']);
  //         } else {
  //           this.existErrorMessage = true;
  //           this.errorMessage = response.message;
  //         }
  //       },
  //       error: (error) => {
  //         this.existErrorMessage = true;
  //         this.errorMessage = error.message;
  //       }
  //     });
  //   }
  // }
  verify() {
    const otpValue = this.otp.join("");
    
    if (otpValue.length !== 6) {
      this.showMessage('Le code OTP doit contenir 6 chiffres');
      return;
    }
    if (this.email) {
      this.authService.verifyOtp({ email: this.email, otp: otpValue }).subscribe({
        next: (response) => {
          if (response.status) {
            this.otpStateService.clearOtpState();
            this.showMessage(response.message);
            this.router.navigate(['/index']);
          } else {
            console.log(response);
            this.existErrorMessage = true;
            this.errorMessage = response.message;
            // this.showError(response.message || 'Erreur de vérification');
          }
        },
        error: (error) => {
          this.existErrorMessage = true;
          this.errorMessage = error.message;
          // this.showError(error.error?.message || 'Code de vérification incorrect');
        }
      });
    }

  }

  showMessage(message:string){
    this.snackBar.open(
    message,
    'MERCI',
    {
      duration: 10000
    }
  );
}
}

