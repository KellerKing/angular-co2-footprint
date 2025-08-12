import { Component, Inject, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

export interface DialogSettingsInput {
  isRightToLeft: boolean;
}

export interface DialogSettingsOutput {
  isRightToLeft: boolean;
  isCancelled: boolean;
}

@Component({
  selector: 'app-dialog.settings',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatButtonModule,
  ],
  template: `
    <h2 mat-dialog-title>Einstellungen</h2>
    <mat-dialog-content>
      <mat-slide-toggle [(ngModel)]="isRightToLeft"
        >Ist Anwendung RTL: {{ isRightToLeft }}</mat-slide-toggle
      >
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onExitDialog(false)" cdkFocusInitial>
        Übernehmen
      </button>
       <button mat-button (click)="onExitDialog(true)">Cancel</button>
    </mat-dialog-actions>
  `,
  styles: ``,
})
export class DialogSettingsComponent {
  readonly dialogRef = inject(
    MatDialogRef<DialogSettingsComponent, DialogSettingsOutput> //DialogSettingsOutput ist hier der Rückgabetyp der in app.component.ts beim subscribe verwendet wird
  );

  isRightToLeft: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) data: DialogSettingsInput) {
    this.isRightToLeft = data.isRightToLeft;
  }

  onExitDialog(isCancelled: boolean): void {
    if (isCancelled) {
      this.dialogRef.close({ isCancelled: isCancelled });
      return;
    }

    this.dialogRef.close({ isRightToLeft: this.isRightToLeft });
  }
}
