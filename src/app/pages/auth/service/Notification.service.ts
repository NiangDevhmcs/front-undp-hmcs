// src/app/core/services/notification.service.ts
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MessageType } from '../../response-type/Type';

@Injectable({
    providedIn: 'root'
})

export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showNotification(message: string, type: MessageType) {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.horizontalPosition = 'end';
    config.verticalPosition = 'top';
    config.panelClass = [type, 'custom-snackbar'];

    this.snackBar.open(message, 'Fermer', config);
  }
}