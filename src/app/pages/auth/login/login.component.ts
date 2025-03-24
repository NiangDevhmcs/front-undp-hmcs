import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../service/auth.service';
import { map, Observable } from 'rxjs';
import { ResponseAppSetting } from '../../response-type/Type';
import { ApplicationSetting } from '../../interface/ApplicationSetting';
import { OtpStateService } from '../service/OtpState.service';
import { LanguageService } from '../service/Language.service';
import { LanguageSelectorComponentComponent } from "../../../language-selector-component/language-selector-component.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'vex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeInUp400ms],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatCheckboxModule,
    RouterLink,
    MatSnackBarModule,
    MatProgressBarModule,
    LanguageSelectorComponentComponent,
    TranslateModule
]
})
export class LoginComponent implements OnInit{
  data$: Observable<ResponseAppSetting> = new Observable<ResponseAppSetting>;
  applicationSetting!: ApplicationSetting;

  form: UntypedFormGroup = this.fb.group({
    email: ['niangdev031299@gmail.com', [Validators.required, Validators.minLength(8), Validators.maxLength(254),
      Validators.email, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    password: ['password', [Validators.required, Validators.minLength(8)]],
    remember_me: [false],
  });

  inputType = 'password';
  visible = false;
  mainFrameLoading:boolean= false;
  disabledBtn:boolean = false;
  existErrorMessage:boolean=false;
  errorMessage!:string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private authService:AuthService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private otpStateService: OtpStateService,
    private laguageService:LanguageService,
    private translate: TranslateService
  ) {
    this.translate.use(laguageService.getLocale());
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.data$ = this.activatedRoute.data.pipe(
        map(data => {
            return data['dataSchool'];
    }));
    if (this.data$) {
        this.data$.subscribe(response=>{
            this.applicationSetting = response.data;
        })
    }
  }

  send() {
    if (!this.form.invalid) {
      this.mainFrameLoading = true;
      this.disabledBtn = true;
      const credentials = this.form.value;

      this.authService.login(credentials).subscribe({

        next: (response) => {
          if (response.requires_otp) {
            this.authService.checkOtp(this.form.get('email')?.value).subscribe({
              next: (responseOtp) => {
                this.showMessage(responseOtp.message);
                this.otpStateService.setOtpState(responseOtp.email, true, responseOtp.otp_expires_in);
                this.router.navigate(['/otp']);
              }
            });
          }else {
            this.showMessage(response.message);
            this.router.navigate(['/index']);
          }
        },
       error:(error)=>{
              if (error.error.errors?.email?.[0]) {
                  this.errorMessage = error.error.errors.email[0];
                  this.existErrorMessage = true;
                  this.mainFrameLoading = false;
                  this.disabledBtn = false;

              }else if (error.error.status == 400 || error.error.status == 429) {
                  this.errorMessage = error.error.message;
                  this.existErrorMessage = true;
                  this.mainFrameLoading = false;
                  this.disabledBtn = false;

              }else {
                  this.errorMessage = error.error.message;
                  this.existErrorMessage = true;
                  this.mainFrameLoading = false;
                  this.disabledBtn = false;
              }
      }
      })
  }
  }

  submitOtp(otp: string) {
    const email = this.form.get('email')?.value;
    this.authService.verifyOtp({ email, otp }).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
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

  showMessage(message:string){
      this.snackBar.open(
      message,
      'X',
      {
        duration: 10000
      }
    );
  }


}
