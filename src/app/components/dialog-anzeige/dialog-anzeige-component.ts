import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog.rechtliches',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogModule,
  ],
  template: `
    <h2 mat-dialog-title>{{ data.titel }}</h2>
    <mat-dialog-content>
      @if (data.isHtmlSicher){
      <span [innerHTML]="data.datacontent"></span>
      } @else {
      <span>{{ data.datacontent }}</span>
      }
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close cdkFocusInitial>Schließen</button>
    </mat-dialog-actions>
  `,
})
export class DialogRechtlichesComponent {
  data = inject(MAT_DIALOG_DATA);
}
//https://v20.material.angular.dev/components/dialog/overview
