import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../service/auth.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'vex-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [fadeInUp400ms],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NgIf,
    MatButtonModule,
    MatProgressBarModule,
    MatSnackBarModule
  ]
})
export class ForgotPasswordComponent implements OnInit {
  mainFrameLoading:boolean= false;

  form = this.fb.group({
    email: ['', Validators.required]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  send() {
    if (this.form.valid && this.form.value.email) {
      this.mainFrameLoading = true;
      this.form.disable();
      const email = this.form.value.email;
      this.authService.forgotPassword(email)
        .subscribe({
          next: (response) => {
            this.showMessage(response.message);
            this.router.navigate(['/']);
          },
          error: (error) => {
            this.showMessage(error.error.message);
            this.mainFrameLoading = false;
            this.form.enable();
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
  

}
