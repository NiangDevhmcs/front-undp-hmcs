import { NgIf } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { AuthService } from '../service/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'vex-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  animations: [fadeInUp400ms],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NgIf,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressBarModule
  ]
})
export class ResetPasswordComponent {
  mainFrameLoading:boolean= false;
  resetForm: FormGroup;
  token: string;
  inputType = 'password';
  visible = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private cd: ChangeDetectorRef
  ) {
    this.resetForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });

    // Récupérer le token depuis l'URL
    this.token = this.route.snapshot.queryParams['token'];
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('password_confirmation')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.resetForm.valid) {
      this.mainFrameLoading = true;
      this.resetForm.disable();
      const { email, password, password_confirmation } = this.resetForm.value;
      this.authService.resetPassword(this.token, email, password, password_confirmation)
        .subscribe({
          next: (response) => {
            this.showMessage(response.message);
            this.router.navigate(['/']);
          },
          error: (error) => {
            this.showMessage(error.error.message);
            this.mainFrameLoading = false;
            this.resetForm.enable();
          }
        });
    }
  }


  showMessage(message:string){
    this.snackBar.open(
    message,
    'MERCI',
    {
      duration: 50000
    }
  );
  }

toggleVisibility() {
  if (this.visible) {
    this.inputType = 'password';
    this.visible = false;
    this.cd.markForCheck();
  } else {
    this.inputType = 'text';
    this.visible = true;
    this.cd.markForCheck();
  }
}
}
