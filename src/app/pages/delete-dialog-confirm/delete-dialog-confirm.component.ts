import { NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { VexHighlightDirective } from '@vex/components/vex-highlight/vex-highlight.directive';

@Component({
  selector: 'vex-delete-dialog-confirm',
  templateUrl: './delete-dialog-confirm.component.html',
  styleUrls: ['./delete-dialog-confirm.component.scss'],
  standalone:true,
  imports: [MatButtonModule, MatTabsModule, MatIconModule, MatDialogModule]

})
export class DeleteDialogConfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

    onCancelClick(): void {
      this.dialogRef.close(false);
    }

    onConfirmClick(): void {
      this.dialogRef.close(true);
    }

    ngOnInit() {
      // Précharger les données si nécessaire
      this.prepareDialogData();
    }
  
    private prepareDialogData() {
      // Initialisation synchrone des données
      if (!this.data) {
        this.data = {
          title: this.data.title,
          message: this.data.message
        };
      }
    }
}
