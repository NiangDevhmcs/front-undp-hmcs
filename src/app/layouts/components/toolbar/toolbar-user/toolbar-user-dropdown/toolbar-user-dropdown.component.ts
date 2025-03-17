import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { MenuItem } from '../interfaces/menu-item.interface';
import { trackById } from '@vex/utils/track-by';
import { VexPopoverRef } from '@vex/components/vex-popover/vex-popover-ref';
import { Router, RouterLink } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from 'src/app/pages/auth/service/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

export interface OnlineStatus {
  id: 'online' | 'away' | 'dnd' | 'offline';
  label: string;
  icon: string;
  colorClass: string;
}

@Component({
  selector: 'vex-toolbar-user-dropdown',
  templateUrl: './toolbar-user-dropdown.component.html',
  styleUrls: ['./toolbar-user-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    NgFor,
    MatRippleModule,
    RouterLink,
    NgClass,
    NgIf,
    CommonModule,
    MatSnackBarModule
  ]
})
export class ToolbarUserDropdownComponent implements OnInit {
  items: MenuItem[] = [
    {
      id: '1',
      icon: 'mat:account_circle',
      label: 'Mon profil',
      description: 'Informations personnelles',
      colorClass: 'text-teal-600',
      route: '/index/personnel-information'
    },
    {
      id: '4',
      icon: 'mat:settings',
      label: 'Paramétres',
      description: "Les paramètres de la boutique",
      colorClass: 'text-purple-600',
      route: '/index/school-infos'
    }
  ];
  trackById = trackById;
  statuses: OnlineStatus[] = [
    {
      id: 'online',
      label: 'En ligne',
      icon: 'mat:check_circle',
      colorClass: 'text-green-600'
    }
  ];

  activeStatus: OnlineStatus = this.statuses[0];

  constructor(
    private cd: ChangeDetectorRef,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private popoverRef: VexPopoverRef<ToolbarUserDropdownComponent>
  ) {}

  user$ = this.authService.getCurrentUser();
  ngOnInit() {}

  setStatus(status: OnlineStatus) {
    this.cd.markForCheck();
  }

  close() {
    this.popoverRef.close();
  }

  logout(){
    this.authService.logout().subscribe({
        next:(response)=>{
            this.popoverRef.close();
            this.showMessage(response.message)
            this.router.navigate(['/login']);
        },
        error:(error)=>{
            console.error('Erreur lors de la deconnexion', error);
            this.showMessage('Erreur lors de la deconnexion')
        }
    })
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
