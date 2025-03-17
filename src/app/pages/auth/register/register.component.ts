import { ChangeDetectorRef, Component } from '@angular/core';
import {
  AbstractControl,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'vex-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [fadeInUp400ms],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    NgIf,
    MatIconModule,
    MatCheckboxModule,
    RouterLink,
    MatProgressBarModule
  ]
})
export class RegisterComponent {
  form: UntypedFormGroup = this.fb.group({
    first_name: ['', [Validators.required, Validators.minLength(2)]],
    last_name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(254),
    Validators.email, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    // preferred_language: ['', Validators.required],
    password: ['', Validators.required],
    password_confirmation: [''],
  }, { validators: this.passwordMatchValidator });

  inputType = 'password';
  visible = false;
  mainFrameLoading:boolean = false;
  showBtn:boolean=true;
  showCardMessage:boolean=false;
  message = '';
  errorMessage= '';
  showError:boolean=false;

  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  send() {
    if (this.form.valid) {
      this.mainFrameLoading = true;
      this.showBtn = false;
      this.showError = false;
      this.errorMessage = '';

      // Disable form while submitting
      this.form.disable();

      const formData = this.form.value;

      this.authService.register(formData).subscribe({
        next: (response) => {
          this.mainFrameLoading = false;
          this.showCardMessage = true;
          this.message = response.message;
        },
        error: (error) => {
          this.mainFrameLoading = false;
          this.showBtn = true;

          // Handle specific validation errors from backend
          if (error.error && error.error.error ) {
            console.log(error.error.error);

            this.errorMessage = error.error.message;
            this.showError = true;

            if (error.error.message === 'This email address is already registered.') {
              this.form.get('email')?.setErrors({ 'emailExists': true });
            }
          } else {
            this.errorMessage = 'An error occurred. Please try again later.';
            this.showError = true;
          }

          this.form.enable();
          this.cd.markForCheck();
        }
      });
    }
  }
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('password_confirmation');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
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
