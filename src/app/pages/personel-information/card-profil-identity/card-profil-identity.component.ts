import { NgIf, CommonModule, DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { scaleIn400ms } from '@vex/animations/scale-in.animation';
import { stagger80ms } from '@vex/animations/stagger.animation';
import { AuthService } from '../../auth/service/auth.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { environment } from 'src/assets/environment';
import { MessageType } from '../../response-type/Type';
import { User } from '../../interface/User';

@Component({
  selector: 'vex-card-profil-identity',
  templateUrl: './card-profil-identity.component.html',
  styleUrls: ['./card-profil-identity.component.scss'],
  standalone: true,
  animations: [stagger80ms, fadeInUp400ms, scaleIn400ms, fadeInRight400ms],
  imports: [
    MatRippleModule,
    MatIconModule,
    MatButtonModule,
    NgIf,
    CommonModule,
    MatTooltipModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCardModule,
    MatRadioModule
  ]
})

export class CardProfilIdentityComponent implements OnInit {
  showData: boolean = true;
  showForm: boolean = false;
  showContactData: boolean = true;
  showContactForm: boolean = false;
  user$ = this.authService.getCurrentUser();
  fileUpload!: File | Blob | null;
  imageUrl: string = '';
  infofileoctets: string = '';
  selectedFile!: File | Blob | null;
  mainFrameLoading: boolean = false;
  disabledBtn: boolean = false;

  maxTotalSize = 5 * 1024 * 1024; // 5MB (vous pouvez ajuster selon environment.max_file_size)
  @ViewChild('fileInput', { static: true })
  fileInput!: ElementRef<HTMLInputElement>;

  form!: UntypedFormGroup;

  // Simulation de la réponse du service
  // user$: Observable<User> = new Observable<User>(observer => {
  //   observer.next({
  //     id: 1,
  //     first_name: "Ibrahima",
  //     last_name: "NIANG",
  //     phone_number_one: "770906538",
  //     phone_number_two: null,
  //     email: "niangdev031299@gmail.com",
  //     email_verified_at: "2025-03-17T09:46:42.000000Z",
  //     two_factor_confirmed_at: null,
  //     role_id: 1,
  //     status: 1,
  //     address: "Bargny",
  //     gender: "male",
  //     current_team_id: null,
  //     profile_photo_path: null,
  //     requires_otp: false,
  //     role: {
  //       id: 1,
  //       name: "Sysmanager"
  //     }
  //   });
  // });

  userSelected: User | null = null;

  constructor(
    private snackbar: MatSnackBar,
    private fb: UntypedFormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    // Initialiser le formulaire avec des valeurs par défaut
    this.initializeForm();
    // Récupérer les données utilisateur
    this.checkExistingUser();
  }

  initializeForm() {
    // Structure identique à votre code original
    this.form = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(254),
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]],
      profile_photo_path: [null],
      phone_number_one: ['', [
        Validators.required,
        Validators.minLength(9),
        Validators.pattern('^[0-9]*$')
      ]],
      phone_number_two: ['', [
        Validators.minLength(9),
        Validators.pattern('^[0-9]*$')
      ]],
      status: ['actif'],
      address: ['', [Validators.required, Validators.minLength(2)]],
      gender: ['', [Validators.required]],
      role_id: ['', [Validators.required]]
    });
  }

  checkExistingUser() {
    this.user$.subscribe({
      next: (response:any) => {
        if (response) {
          this.userSelected = response;
          this.imageUrl = response.profile_photo_url || '';
          // Mettre à jour le formulaire avec les données utilisateur
          this.updateFormWithUserData();
        }
      },
      error: (error:any) => {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
      }
    });
  }

  updateFormWithUserData() {
    if (this.userSelected) {
      this.imageUrl = this.userSelected.profile_photo_path || '';
      this.form.patchValue({
        first_name: this.userSelected.first_name || '',
        last_name: this.userSelected.last_name || '',
        email: this.userSelected.email || '',
        phone_number_one: this.userSelected.phone_number_one || '',
        phone_number_two: this.userSelected.phone_number_two || '',
        status: this.userSelected.status || 'actif',
        address: this.userSelected.address || '',
        gender: this.userSelected.gender || '',
        role_id: this.userSelected.role_id || '',
        profile_photo_path: this.userSelected.profile_photo_path
      });
    }
  }

  getRouterLink() {
    this.showForm = !this.showForm;
    this.showData = !this.showData;
    this.updateFormWithUserData();
  }

  toggleContactForm() {
    this.showContactForm = !this.showContactForm;
    this.showContactData = !this.showContactData;
    this.updateFormWithUserData();
  }

  getTotalFileSize(): number {
    return this.selectedFile ? this.selectedFile.size : 0;
  }

  formatFileSize(octets: number, decimals: number = 2): string {
    if (octets === 0) return '0 ' + this.infofileoctets;

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = [
      this.infofileoctets,
      'Ko',
      'Mo',
      'Go',
      'To',
      'Po',
      'Eo',
      'Zo',
      'Yo'
    ];

    const i = Math.floor(Math.log(octets) / Math.log(k));

    return parseFloat((octets / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  onFileSelected(event: any): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput && fileInput.files) {
      const file: FileList = fileInput.files;
      if (file.length > 0) {
        this.selectedFile = file[0];
        if (this.selectedFile.size > this.maxTotalSize) {
          this.showMessage('Taille de fichier dépassée', 'error-snackbar');
          this.selectedFile = new File([], '');
          return;
        }
        // Vérification du format du fichier
        const validFormats = ['application/pdf','image/jpeg', 'image/png', 'image/jpg', 'image/gif'];

        if (!validFormats.includes(this.selectedFile.type)) {
          this.showMessage('Format de fichier non pris en charge', 'error-snackbar');
          this.selectedFile = new File([], '');
          return;
        }
        this.imageUrl = URL.createObjectURL(this.selectedFile);
        this.form.patchValue({
          profile_photo_path: this.selectedFile
        });
      }
    }
  }

  private showMessage(message: string, panelClass: MessageType) {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.horizontalPosition = 'end';
    config.verticalPosition = 'top';
    config.panelClass = [panelClass];
    this.snackbar.open(message, 'Fermer', config);
  }

  submit() {
    if (this.form.valid) {
      // Logique de soumission du formulaire
      console.log('Formulaire soumis:', this.form.value);
      this.showMessage('Informations mises à jour avec succès', 'success-snackbar');
      this.getRouterLink(); // Revenir à l'affichage des données
    } else {
      this.showMessage('Veuillez remplir correctement tous les champs requis', 'error-snackbar');
    }
  }
}
// export class CardProfilIdentityComponent implements OnInit{
//   showData: boolean = true;
//   showForm: boolean = false;
//   // fileUpload!: File | Blob | null;
//   // imageUrl: string = '';
//   infofileoctets: string = '';
//   infolimitFile: string = 'bank-information.infofile.limit';
//     fileUpload!: File | Blob | null;
//     imageUrl: string = '';
//   selectedFile!: File | Blob | null;
//   mainFrameLoading: boolean = false;
//   disabledBtn: boolean = false;

//   maxTotalSize = environment.max_file_size;
//   @ViewChild('fileInput', { static: true })
//   fileInput!: ElementRef<HTMLInputElement>;
//   // Messages de traduction
//   bytesText: string = '';
//   allowedFormatsMessage: string = '';
//   form!: UntypedFormGroup;
//   user$ = this.authService.getCurrentUser();
//   userSelected:User | null = null;
//   constructor(
//     private snackbar: MatSnackBar,
//     private authService: AuthService,
//     private fb: UntypedFormBuilder
//   ) {
//   }

//   ngOnInit(): void {
//     // Créez d'abord le formulaire avec des valeurs par défaut
//     this.initializeForm();
//     // Puis récupérez les données utilisateur
//     this.checkExistingUser();
//   }

//   initializeForm() {
//     // Initialiser le formulaire avec des valeurs vides ou par défaut
//     this.form = this.fb.group({
//       first_name: ['', [Validators.required, Validators.minLength(2)]],
//       last_name: ['', [Validators.required, Validators.minLength(2)]],
//       email: ['', [
//         Validators.required,
//         Validators.minLength(8),
//         Validators.maxLength(254),
//         Validators.email,
//         Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
//       ]],
//       profile_photo_path: [null],
//       phone_number_one: ['', [
//         Validators.required,
//         Validators.minLength(9),
//         Validators.pattern('^[0-9]*$')
//       ]],
//       phone_number_two: ['', [
//         Validators.minLength(9),
//         Validators.pattern('^[0-9]*$')
//       ]],
//       status: ['actif'],
//       address: ['', [Validators.required, Validators.minLength(2)]],
//       gender: ['', [Validators.required]],
//       role_id: ['', [Validators.required]]
//     });
//   }

//   checkExistingUser() {
//     this.user$.subscribe({
//       next: (response) => {
//         console.log(response);
//         if (response) {
//           this.userSelected = response;
//           this.imageUrl = response.profile_photo_url;
//           // Mettre à jour le formulaire avec les données utilisateur
//           this.updateFormWithUserData();
//         }
//       },
//       error: (error) => {
//         console.error('Erreur lors de la récupération des données utilisateur:', error);
//       }
//     });
//   }

//   updateFormWithUserData() {
//     if (this.userSelected) {
//       this.imageUrl = this.userSelected.profile_photo_path || '';
//       this.form.patchValue({
//         first_name: this.userSelected.first_name || '',
//         last_name: this.userSelected.last_name || '',
//         email: this.userSelected.email || '',
//         phone_number_one: this.userSelected.phone_number_one || '',
//         phone_number_two: this.userSelected.phone_number_two || '',
//         status: this.userSelected.status || 'actif',
//         address: this.userSelected.address || '',
//         gender: this.userSelected.gender || '',
//         role_id: this.userSelected.role_id || '',
//         profile_photo_path: this.userSelected.profile_photo_path
//       });
//     }
//   }

//   getRouterLink(){
//     this.showForm = !this.showForm;
//     this.showData = !this.showData;
//     this.updateFormWithUserData();
//   }
//   createForm() {
//     if (!this.userSelected) {
//       return;
//     }
//     this.imageUrl = this.userSelected.profile_photo_path || '';

//     this.form = this.fb.group({
//       first_name: [
//         this.userSelected.first_name || '',
//         [Validators.required, Validators.minLength(2)]
//       ],
//       last_name: [
//         this.userSelected.last_name || '',
//         [Validators.required, Validators.minLength(2)]
//       ],
//       email: [
//         this.userSelected.email || '',
//         [
//           Validators.required,
//           Validators.minLength(8),
//           Validators.maxLength(254),
//           Validators.email,
//           Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
//         ]
//       ],
//       profile_photo_path:null,
//       phone_number_one: [
//         this.userSelected.phone_number_one || '',
//         [
//           Validators.required,
//           Validators.minLength(9),
//           Validators.pattern('^[0-9]*$')
//         ]
//       ],
//       phone_number_two: [
//         this.userSelected.phone_number_two || '',
//         [Validators.minLength(9), Validators.pattern('^[0-9]*$')]
//       ],
//       status: [this.userSelected.status || 'actif'],
//       address: [
//         this.userSelected.address || '',
//         [Validators.required, Validators.minLength(2)]
//       ],
//       gender: [this.userSelected.gender || '', [Validators.required]],
//       role_id: [this.userSelected.role_id || '', [Validators.required]]
//     });
//   }

//   getTotalFileSize(): number {
//     return this.selectedFile ? this.selectedFile.size : 0;
//   }

//   formatFileSize(octets: number, decimals: number = 2): string {
//     if (octets === 0) return '0 ' + this.infofileoctets;

//     const k = 1024;
//     const dm = decimals < 0 ? 0 : decimals;
//     const sizes = [
//       this.infofileoctets,
//       'Ko',
//       'Mo',
//       'Go',
//       'To',
//       'Po',
//       'Eo',
//       'Zo',
//       'Yo'
//     ];

//     const i = Math.floor(Math.log(octets) / Math.log(k));

//     return parseFloat((octets / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
//   }

//   onFileSelected(event: any): void {
//     const fileInput = event.target as HTMLInputElement;

//     if (fileInput && fileInput.files) {
//       const file: FileList = fileInput.files;
//       if (file.length > 0) {
//         this.selectedFile = file[0];
//         if (this.selectedFile.size > this.maxTotalSize) {
//           this.showMessage('Taille de fichier dépassée', 'error-snackbar');
//             this.selectedFile = new File([], '');
//           // })
//           return;
//         }
//         // Vérification du format du fichier
//         const validFormats = ['application/pdf','image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
//         console.log(this.selectedFile.type);

//         if (!validFormats.includes(this.selectedFile.type)) {
//           this.showMessage('Format de fichier non pris en charge', 'error-snackbar');
//           this.selectedFile = new File([], '');
//           return;
//         }
//         this.imageUrl = URL.createObjectURL(this.selectedFile);
//         this.form.patchValue({
//           profile_photo_path: this.selectedFile
//         });
//       }
//     }
//   }

//   private showMessage(message: string, panelClass: MessageType) {
//     const config = new MatSnackBarConfig();
//     config.duration = 3000;
//     config.horizontalPosition = 'end';
//     config.verticalPosition = 'top';
//     config.panelClass = [panelClass];
//     this.snackbar.open(message, 'Fermer', config);
//   }
// }
