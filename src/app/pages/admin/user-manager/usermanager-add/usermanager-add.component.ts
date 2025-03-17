import { NgIf, DatePipe, NgFor } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { scaleIn400ms } from '@vex/animations/scale-in.animation';
import { stagger80ms } from '@vex/animations/stagger.animation';
import { AuthService } from 'src/app/pages/auth/service/auth.service';
import { Campus } from 'src/app/pages/interface/Campus';
import { Role } from 'src/app/pages/interface/Role';
import { User } from 'src/app/pages/interface/User';
import { UserAddComponent } from 'src/app/pages/manage/user/user-add/user-add.component';
import { UserService } from 'src/app/pages/profil/user.service';
import { Gender, GenderOption } from 'src/app/pages/response-type/Type';
import { CampusService } from '../../campus/campus.service';
type MessageType = 'error-snackbar' | 'success-snackbar';

@Component({
  selector: 'vex-usermanager-add',
  templateUrl: './usermanager-add.component.html',
  styleUrls: ['./usermanager-add.component.scss'],
    animations: [stagger80ms, scaleIn400ms, fadeInRight400ms, fadeInUp400ms],
    standalone: true,
    imports: [
      ReactiveFormsModule,
      MatDialogModule,
      NgFor,
      NgIf,
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
      MatProgressBarModule,
      FormsModule
    ],
    providers:[DatePipe]
})
export class UsermanagerAddComponent implements OnInit {
    form!: FormGroup;
    selectedFile: File | null = null;
    imageUrl: string='' ;
    messageCtrlImg: string='' ;
    mainFrameLoading:boolean= false;
    isFailedImg:boolean= false;
    isEditMode:boolean= false;
    userSelected!:User;
    roles : Role[] = [];
    campuses : Campus[] = [];
    campus_id:string | null = null;
  
    genderOptions: GenderOption[] = [
      { value: Gender.MALE, label: 'Homme' },
      { value: Gender.FEMALE, label: 'Femme' }
    ];

    constructor(private fb: FormBuilder,  
      @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef: MatDialogRef<UserAddComponent>, 
      private datePipe: DatePipe,
      private activatedRoute: ActivatedRoute,
      private userService: UserService,
      private campusService: CampusService,
      private authService: AuthService,
      private snackBar: MatSnackBar,
      private router:Router
    ) {
      this.campus_id = authService.getCampusId();
      this.isEditMode = data.isEditMode;
      this.userSelected = data.user || {};
      this.imageUrl = this.userSelected.profile_photo_path || '';
    }

    ngOnInit(): void {
      this.userService.getRole().subscribe({
        next: (response) => {
          this.roles = response.data;
        }
      });

      this.campusService.OwnerGetCampusByTenant().subscribe({
        next:(response)=>{
          this.campuses = response.data;
        }
      })

      this.form = this.fb.group({
        first_name: [this.userSelected.first_name || '', [Validators.required, Validators.minLength(2)]],
        last_name: [this.userSelected.last_name || '', [Validators.required, Validators.minLength(2)]],
        email: [this.userSelected.email || '', [Validators.required, Validators.minLength(8), Validators.maxLength(254),
          Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
          profile_photo_path: null,
        phone_number_one: [this.userSelected.phone_number_one || '',[Validators.required, Validators.minLength(9), Validators.pattern('^[0-9]*$')]],
        phone_number_two: [this.userSelected.phone_number_two || '',[Validators.minLength(9), Validators.pattern('^[0-9]*$')]],
        status: [this.userSelected.status || 'actif'],
        address: [this.userSelected.address || '', [Validators.required, Validators.minLength(2)]],
        gender: [this.userSelected.gender || '', [Validators.required]],
        role_id: [this.userSelected.role_id || '', [Validators.required]],
        campus_id: [this.userSelected.campus_id || '' , [Validators.required]],
      });

    }

    
    onFileChange(event: any) {
      const file = event.target.files[0];
    
      if (!file) {
        return null;
      }
    
      const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg'];
      if (!validImageTypes.includes(file.type)) {
        this.isFailedImg = true;
        this.messageCtrlImg = 'Fichier Invalide.Choisir un type (jpeg, png, jpg, gif, svg).';
        return;
      }
    
      const maxSizeInKB = 2048;
      if (file.size / 1024 > maxSizeInKB) {
        this.isFailedImg = true;
        this.messageCtrlImg = 'La taille du fichier dépasse la limite de 2MB.';
        return;
      }
    
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    
  
    compareSubjects(subject1: any, subject2: any): boolean {
      return subject1 && subject2 ? subject1.id === subject2.id : subject1 === subject2;
    }
    
  
    save() {
      if (!this.form.valid) return;
    
      this.mainFrameLoading = true;
      this.form.disable();
      
      const formData = this.createFormData();
            
      this.userService.addUser(formData).subscribe({
        next: (response) => {
          this.handleSuccess(response);
        },  
        error: (error) => {
          this.handleError();
        }
      });
    }
    
    updateUser() {
      if (!this.form.valid || !this.userSelected || !this.isEditMode) return;
    
      this.mainFrameLoading = true;
      this.form.disable();
      
      const formData = this.createFormData(true);
            
      this.userService.updateUser(this.userSelected.id, formData).subscribe({
        next: (response) => {
          this.handleSuccess(response);
        },  
        error: (error) => {
          this.handleError();
        }
      });
    }
    
    private createFormData(isUpdate: boolean = false): FormData {
      const formData = new FormData();
      
      if (isUpdate) {
        formData.append('_method', 'PUT');
      }
    
      const formFields = {
        'first_name': this.form.get('first_name')?.value,
        'last_name': this.form.get('last_name')?.value,
        'email': this.form.get('email')?.value,
        'phone_number_one': this.form.get('phone_number_one')?.value,
        'phone_number_two': this.form.get('phone_number_two')?.value,
        'gender': this.form.get('gender')?.value,
        'address': this.form.get('address')?.value,
        'role_id': this.form.get('role_id')?.value,
        'campus_id': this.form.get('campus_id')?.value || ''
      };
      // Ajouter tous les champs au FormData
      Object.entries(formFields).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });
    
      // Ajouter le fichier s'il existe
      if (this.selectedFile) {
        formData.append('profile_photo_path', this.selectedFile);
      }
    
      return formData;
    }
    
    private handleSuccess(response: any) {
      this.showMessage(response.message, 'success-snackbar');
      this.mainFrameLoading = false;
      this.form.enable();
      this.close();
      this.list();
    }
    
    private handleError() {
      this.mainFrameLoading = false;
      this.form.enable();
    }
    private showMessage(message: string, panelClass: MessageType) {
      const config = new MatSnackBarConfig();
      config.duration = 5000;
      config.horizontalPosition = 'end';
      config.verticalPosition = 'top';
      config.panelClass = [panelClass];
      this.snackBar.open(message, 'Fermer', config);
    }
  
    list(){
      this.router.navigate(['/index/manage/users/list'])
    }

    close(): void {
      this.dialogRef.close(true);
    } 
}
