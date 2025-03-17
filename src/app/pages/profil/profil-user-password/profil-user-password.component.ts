import { NgIf, NgFor, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { scaleIn400ms } from '@vex/animations/scale-in.animation';
import { stagger80ms } from '@vex/animations/stagger.animation';
import { User } from '../../interface/User';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAddComponent } from '../../manage/user/user-add/user-add.component';
import { UserService } from '../user.service';
import { map, Observable } from 'rxjs';
import { ResponseMessage } from '../../response-type/Type';
import { AuthService } from '../../auth/service/auth.service';
type MessageType = 'error-snackbar' | 'success-snackbar';

@Component({
  selector: 'vex-profil-user-password',
  templateUrl: './profil-user-password.component.html',
  styleUrls: ['./profil-user-password.component.scss'],
  animations: [stagger80ms, scaleIn400ms, fadeInRight400ms, fadeInUp400ms],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressBarModule
  ],
  providers:[DatePipe]
})
export class ProfilUserPasswordComponent {
  // hide = true;
  // form!: FormGroup;
  // formPassword!: FormGroup;
  // selectedFile: File | null = null;
  // imageUrl: string='' ;
  // messageCtrlImg: string='' ;
  // messageCtrlNewPassword: string='' ;
  // mainFrameLoading:boolean= false;
  // isFailedImg:boolean= false;
  // isEditMode:boolean= false;
  // userSelected!:User;
  // selected_subjects : number[] = [];
  // data:any;
  // inputType = 'password';
  // visible = false;
  
  // data$: Observable<User> = new Observable<User>;
  // user!: User;
  
  // constructor(private fb: FormBuilder,  
  //   private datePipe: DatePipe,
  //   private activatedRoute: ActivatedRoute,
  //   private userService: UserService,
  //   private snackBar: MatSnackBar,
  //   private router:Router,
  //   private cd: ChangeDetectorRef,
  //   public authService: AuthService
  // ) {

  //   // this.isEditMode = this.data.isEditMode;
  //   // this.userSelected = this.data.user || {};
  //   // this.imageUrl = this.userSelected.image_url || '';
  // }

  // // getData(){
  // //   this.data$ = this.activatedRoute.data.pipe(
  // //       map(data => {
  // //           console.log(data['dataAccountUser']);
  // //           return data['dataAccountUser'].user;
  // //   }));
  // //   if (this.data$) {
  // //       this.data$.subscribe(response=>{
  // //           this.user = response;
  // //       })
  // //   }
  // // }

  // ngOnInit(): void {
  //   // this.getData();
  //   this.imageUrl = this.user.profile_photo_url;
  //   this.form = this.fb.group({
  //     first_name: [this.user.first_name || '', [Validators.required, Validators.minLength(2)]],
  //     last_name: [this.user.last_name || '', [Validators.required, Validators.minLength(2)]],
  //     email: [this.user.email || '', [Validators.required, Validators.minLength(8), Validators.maxLength(254),
  //       Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
  //     image: null,
  //     phone_number_one: [this.user.phone_number_one || '',[Validators.minLength(9), Validators.pattern('^[0-9]*$')]],
  //     phone_number_two: [this.user.phone_number_two || '',[Validators.required, Validators.minLength(9), Validators.pattern('^[0-9]*$')]],
  //     status: [this.user.status || 'actif'],
  //     address: [this.user.address || '', [Validators.required, Validators.minLength(2)]],
  //     gender: [this.user.gender || '', [Validators.required]],
  //     date_of_birth: [this.user.date_of_birth || '', [Validators.required]],
  //     role_id: [this.user.role_id || '', [Validators.required]],
  //   });

  //   this.formPassword = this.fb.group({
  //     current_password: ['', [Validators.required, Validators.minLength(8)]],
  //     new_password: ['', [Validators.required, Validators.minLength(8)]],
  //     new_password_confirmation: ['', [Validators.required, Validators.minLength(8)]],
  //   });

  //   if (this.formPassword.get('new_password')?.value != this.formPassword.get('new_password_confirmation')?.value) {
  //     this.messageCtrlNewPassword = 'La confirmation du nouveau mot de passe ne correspond pas.';
  //   }

  // }

  // onFileChange(event: any) {
  //   const file = event.target.files[0];
  
  //   if (!file) {
  //     return null;
  //   }
  
  //   const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg'];
  //   if (!validImageTypes.includes(file.type)) {
  //     this.isFailedImg = true;
  //     this.messageCtrlImg = 'Fichier Invalide.Choisir un type (jpeg, png, jpg, gif, svg).';
  //     return;
  //   }
  
  //   const maxSizeInKB = 2048;
  //   if (file.size / 1024 > maxSizeInKB) {
  //     this.isFailedImg = true;
  //     this.messageCtrlImg = 'La taille du fichier dépasse la limite de 2MB.';
  //     return;
  //   }
  
  //   this.selectedFile = file;
  //   const reader = new FileReader();
  //   reader.onload = (e: any) => {
  //     this.imageUrl = e.target.result;
  //   };
  //   reader.readAsDataURL(file);
  // }
  

  // compareSubjects(subject1: any, subject2: any): boolean {
  //   return subject1 && subject2 ? subject1.id === subject2.id : subject1 === subject2;
  // }
  

  // toggleVisibility() {
  //   if (this.visible) {
  //     this.inputType = 'password';
  //     this.visible = false;
  //     this.cd.markForCheck();
  //   } else {
  //     this.inputType = 'text';
  //     this.visible = true;
  //     this.cd.markForCheck();
  //   }
  // }

  // save() {    
  //   if (this.form.valid) {
  //     this.mainFrameLoading = true;
  //     this.form.disable();
  //     const formData = new FormData();
  //     formData.append('_method', 'PUT');
  //     formData.append('first_name', this.form.get('first_name')?.value);
  //     formData.append('last_name', this.form.get('last_name')?.value);
  //     formData.append('email', this.form.get('email')?.value);
  //     formData.append('phone_work', this.form.get('phone_work')?.value);
  //     formData.append('phone_home', this.form.get('phone_home')?.value);
  //     const dateOfBirth = this.form.get('date_of_birth')?.value;
  //     const formattedDateOfBirth = this.datePipe.transform(dateOfBirth, 'yyyy-MM-dd HH:mm:ss');
  //     formData.append('date_of_birth', formattedDateOfBirth || '');
  //     formData.append('gender', this.form.get('gender')?.value);
  //     formData.append('address', this.form.get('address')?.value);
  //     // formData.append('status', 'actif');
  //     formData.append('role_id', this.user.role_id.toString());
  //     // formData.append('password', 'passer123');
  //     // formData.append('password_confirmation', 'passer123');

  //     if (this.selectedFile) {
  //       formData.append('image', this.selectedFile);
  //     }
            
  //     this.userService.updateUser(this.user.id, formData).subscribe({
  //       next: (response) => {
  //         this.showMessage(response.message, 'success-snackbar');
  //         this.mainFrameLoading = false;
  //         this.form.enable();
  //         window.location.reload();
  //       },  
  //       error: (error) => {
  //         console.log(error);
  //         this.mainFrameLoading = false;
  //         this.form.enable();
  //       }
  //     });
  //   }
  // }

  // updateUser(){
  //   if (this.form.valid && this.userSelected && this.isEditMode) {
  //     this.mainFrameLoading = true;
  //     this.form.disable();
      
  //     const formData = new FormData();
  //     formData.append('_method', 'PUT');
  //     formData.append('first_name', this.form.get('first_name')?.value);
  //     formData.append('last_name', this.form.get('last_name')?.value);
  //     formData.append('email', this.form.get('email')?.value);
  //     formData.append('phone_work', this.form.get('phone_work')?.value);
  //     formData.append('phone_home', this.form.get('phone_home')?.value);
  //     const dateOfBirth = this.form.get('date_of_birth')?.value;
  //     const formattedDateOfBirth = this.datePipe.transform(dateOfBirth, 'yyyy-MM-dd HH:mm:ss');
  //     formData.append('date_of_birth', formattedDateOfBirth || '');
  //     formData.append('gender', this.form.get('gender')?.value);
  //     formData.append('address', this.form.get('address')?.value);
  //     formData.append('status', 'actif');
  //     formData.append('role_id', this.form.get('role_id')?.value);
     
  //     if (this.selectedFile) {
  //       formData.append('image', this.selectedFile);
  //     }
            
  //     this.userService.updateUser(this.userSelected.id, formData).subscribe({
  //       next: (response) => {
  //         this.showMessage(response.message, 'success-snackbar');
  //         this.mainFrameLoading = false;
  //         this.form.enable();
  //       },  
  //       error: (error) => {
  //         this.mainFrameLoading = false;
  //         this.form.enable();
  //       }
  //     });
  //   }
  // }

  // changePassword(){
  //   if (this.formPassword.valid) {
  //     console.log(this.formPassword.value);
  //     this.userService.changePassword(this.user.id, this.formPassword.value).subscribe({
  //       next:(response)=>{
  //         this.showMessage(response.message, 'success-snackbar');
  //         this.logout();
  //       },
  //       error:(error)=>{
  //         this.messageCtrlNewPassword = error.error.message;
  //       }
  //     })
  //   }
  // }

  // logout(){
  //   this.authService.logout().subscribe({
  //     next:(response)=>{
  //         this.router.navigate(['/login']);
  //     },
  //     error:(error)=>{
  //         console.error('Erreur lors de la deconnexion', error);
  //     }
  // })
  // }
  // private showMessage(message: string, panelClass: MessageType) {
  //   const config = new MatSnackBarConfig();
  //   config.duration = 5000;
  //   config.horizontalPosition = 'end';
  //   config.verticalPosition = 'top';
  //   config.panelClass = [panelClass];
  //   this.snackBar.open(message, 'Fermer', config);
  // }
}
