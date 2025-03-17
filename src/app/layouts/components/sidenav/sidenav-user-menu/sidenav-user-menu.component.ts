import { Component, OnInit } from '@angular/core';
import { VexPopoverRef } from '@vex/components/vex-popover/vex-popover-ref';
import { MatRippleModule } from '@angular/material/core';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from 'src/app/pages/auth/service/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
type MessageType = 'error-snackbar' | 'success-snackbar';

@Component({
  selector: 'vex-sidenav-user-menu',
  templateUrl: './sidenav-user-menu.component.html',
  styleUrls: ['./sidenav-user-menu.component.scss'],
  imports: [MatRippleModule, RouterLink, MatIconModule,MatSnackBarModule],
  standalone: true
})
export class SidenavUserMenuComponent implements OnInit {
  constructor(private readonly popoverRef: VexPopoverRef, 
    private authService:AuthService,
    private snackBar: MatSnackBar,
    private router: Router) {}

  ngOnInit(): void {}

  close(): void {
    setTimeout(() => this.popoverRef.close(), 250);
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

  profil(){
    this.router.navigate(['/index/personnel-information']);
  }
}
