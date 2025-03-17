import { SelectionModel } from '@angular/cdk/collections';
import { NgIf, NgFor, NgClass, CommonModule, DatePipe } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, UntypedFormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { scaleIn400ms } from '@vex/animations/scale-in.animation';
import { stagger80ms } from '@vex/animations/stagger.animation';
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexPageLayoutContentDirective } from '@vex/components/vex-page-layout/vex-page-layout-content.directive';
import { VexPageLayoutHeaderDirective } from '@vex/components/vex-page-layout/vex-page-layout-header.directive';
import { VexPageLayoutComponent } from '@vex/components/vex-page-layout/vex-page-layout.component';
import { TableColumn } from '@vex/interfaces/table-column.interface';
import { ReplaySubject, Observable, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs';
import { AuthService } from 'src/app/pages/auth/service/auth.service';
import { DeleteDialogConfirmComponent } from 'src/app/pages/delete-dialog-confirm/delete-dialog-confirm.component';
import { Teacher } from 'src/app/pages/interface/Teacher';
import { User } from 'src/app/pages/interface/User';
import { UserAddComponent } from 'src/app/pages/manage/user/user-add/user-add.component';
import { UserService } from 'src/app/pages/profil/user.service';
import { ResponseUser, PaginationMeta } from 'src/app/pages/response-type/Type';
import { environment } from 'src/assets/environment';
import { UsermanagerAddComponent } from '../usermanager-add/usermanager-add.component';
import { CampusService } from '../../campus/campus.service';
import { Campus } from 'src/app/pages/interface/Campus';
type MessageType = 'error-snackbar' | 'success-snackbar';

@Component({
  selector: 'vex-usermanager-list',
  templateUrl: './usermanager-list.component.html',
  styleUrls: ['./usermanager-list.component.scss'],
  animations: [stagger80ms, fadeInUp400ms, scaleIn400ms, fadeInRight400ms],
  standalone: true,
  imports: [
    VexPageLayoutComponent,
    VexPageLayoutHeaderDirective,
    VexBreadcrumbsComponent,
    MatButtonToggleModule,
    ReactiveFormsModule,
    VexPageLayoutContentDirective,
    NgIf,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    NgFor,
    NgClass,
    MatPaginatorModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule,
    CommonModule,
    MatSlideToggleModule
  ],
  providers: [DatePipe]
})
export class UsermanagerListComponent implements OnInit, AfterViewInit {
  selectedRole: string | null = null;
  layoutCtrl = new UntypedFormControl('boxed');

  subject$: ReplaySubject<User[]> = new ReplaySubject<User[]>(1);
  data$: Observable<ResponseUser> = new Observable<ResponseUser>();
  users: User[] = [];
  campus_id:string | null = null;

  @Input()
  columns: TableColumn<Teacher>[] = [
    { label: 'Image', property: 'profile_photo_path', type: 'image', visible: true },
    {
      label: 'Matricules',
      property: 'matricule',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'Prénom',
      property: 'first_name',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'Nom',
      property: 'last_name',
      type: 'text',
      visible: true
    },
    {
      label: 'Email',
      property: 'email',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'Adresse',
      property: 'address',
      type: 'text',
      visible: true
    },
    {
      label: 'Rôle',
      property: 'name',
      type: 'text',
      visible: true
    },
    {
      label: 'Téléphone 1',
      property: 'phone_number_one',
      type: 'text',
      visible: true
    },
    {
      label: 'Téléphone 2',
      property: 'phone_number_two',
      type: 'text',
      visible: false
    },
    {
      label: 'Etat',
      property: 'status',
      type: 'text',
      visible: true
    },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource!: MatTableDataSource<User>;
  selection = new SelectionModel<User>(true, []);
  searchCtrl = new UntypedFormControl();
  nbUser: number = 0;
  campuses:Campus[]= [];
  meta: PaginationMeta = {
    current_page: environment.current_page,
    per_page: environment.per_page,
    total: environment.total
  };

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private campusService: CampusService,
  ) 
  {
    this.searchCtrl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchTerm) =>
          this.userService.getUsersByTenant(
            searchTerm, 
            null,
            this.meta.current_page, 
            this.meta.per_page)
        )
      )
      .subscribe((response) => {
        this.assignData(response);
      });
  }

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  getData() {
    this.selectedRole = null; // Réinitialiser la sélection pour afficher de nouveau le select
    this.data$ = this.activatedRoute.data.pipe(
      map((data) => {
        this.meta = data['dataUserByTenant'];
        this.assignData(data['dataUserByTenant'].data);
        return data['dataUserByTenant'];
      })
    );
    if (this.data$) {
      this.data$.subscribe((response) => {
        this.assignData(response);
      });
    }
  }

  onSelectCampus(id: number) {
    this.refreshData('', id);
  }
  
  
  ngOnInit() {
    this.getData();

    this.campusService.OwnerGetCampusByTenant().subscribe({
      next:(response)=>{
        this.campuses = response.data;
      }
    })
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  assignData(data: ResponseUser) {
    this.users = data.data;
    this.meta = data.meta;
    this.dataSource = new MatTableDataSource<User>(this.users);
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  toggleColumnVisibility(column: TableColumn<Teacher>, event: Event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  addUser() {
    const dialogRef = this.dialog.open(UsermanagerAddComponent, {
      width: '1000px',
      disableClose: true,
      data: {
        isEditMode: false
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.refreshData('',null); 
      }
    });
  }

  deleteUser(element: User) {
    const dialogRef = this.dialog.open(DeleteDialogConfirmComponent, {
      disableClose: true,
      data: {
        title: 'Confirmation',
        message: 'Voulez-vous vraiment supprimer cet utilisateur ?'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.deleteUser(element.id).subscribe({
          next: (response) => {
            this.showMessage(response.message, 'success-snackbar');
            this.refreshData('',null);
          }
        });
      }
    });
  }

  update(user: User) {
    const dialogRef = this.dialog.open(UsermanagerAddComponent, {
      width: '1000px',
      disableClose: true,
      data: {
        isEditMode: true,
        user: user
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.refreshData('',null);
      }
    });
  }

  private showMessage(message: string, panelClass: MessageType) {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.horizontalPosition = 'end';
    config.verticalPosition = 'top';
    config.panelClass = [panelClass];
    this.snackBar.open(message, 'Fermer', config);
  }

  translateRoleName(roleName: string, gender: string): string {
    if (gender === 'male') {
      switch (roleName) {
        case 'Manager':
          return 'Directeur';
        case 'Seller':
          return 'Vendeur';
        case 'Treasurer':
          return 'Trésorier';
        case 'Owner':
          return 'Propriétaire';
        default:
          return roleName;
      }
    } else if (gender === 'female') {
      switch (roleName) {
        case 'Manager':
          return 'Directrice';
        case 'Seller':
          return 'Vendeuse';
        case 'Treasurer':
          return 'Trésorière';
        case 'Owner':
          return 'Propriétaire';
        default:
          return roleName;
      }
    }
    return roleName; // Retour par défaut si le genre n'est pas spécifié
  }

  public refreshData(searchTerm:string, searchByCampus:number|null|undefined){
    this.userService.getUsersByTenant(searchTerm,searchByCampus, this.meta.current_page, this.meta.per_page )
      .subscribe({
        next: (response) => {
          this.assignData(response);
        }
      });
  }

  public updateStatus(element: User, event: MatSlideToggleChange) {
    const dialogRef = this.dialog.open(DeleteDialogConfirmComponent, {
      disableClose: true,
      data: {
        title: 'Confirmation',
        message: 'Voulez-vous vraiment changer le statut de cet utilisateur ?'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.userService.toggleStatus(element.id).subscribe({
          next: (response) => {
            // Conversion en boolean
            element.status = !element.status;
            event.source.checked = element.status;
            this.showMessage(response.message, 'success-snackbar');
            this.refreshData('',null);
          },
          error: (error) => {
            event.source.checked = element.status;
            console.error('Erreur lors du changement de statut:', error);
            this.showMessage('Erreur lors du changement de statut', 'error-snackbar');
          }
        });
      } else{
        event.source.checked = Boolean(element.status);
      }      
    });
  }
  
}
