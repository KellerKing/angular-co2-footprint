import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'dialog-overview-example-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  template: `
    <h2 mat-dialog-title>Rechtliche Hinweise</h2>
    <mat-dialog-content>
      <p>
        Rechtliche Hinweise Impressum Musterfirma GmbH <br>
        Vertreten durch den Geschäftsführer Max Mustermann <br>
        Registergericht: Amtsgericht Musterstadt,
        HRB 12345 <br>
        Umsatzsteuer-ID: DE 123456789 <br> <br>
        Datenschutz Wir erheben und
        verarbeiten personenbezogene Daten gemäß den Bestimmungen der DSGVO.
        Details zum Umfang, Zweck und zur Dauer der Datenverarbeitung finden Sie
        in unserer vollständigen Datenschutzerklärung. Nutzungsbedingungen Die
        auf dieser Webseite bereitgestellten Inhalte dienen nur zu
        Informationszwecken. Jegliche Vervielfältigung, Verbreitung oder
        öffentliche Wiedergabe bedarf der vorherigen schriftlichen Zustimmung
        der Musterfirma GmbH. Haftungsausschluss Trotz sorgfältiger inhaltlicher
        Kontrolle übernehmen wir keine Haftung für externe Links. Für den Inhalt
        verlinkter Seiten sind ausschließlich deren Betreiber verantwortlich. 
        <br> <br>
        © 2025 Musterfirma GmbH. Alle Rechte vorbehalten.
      </p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button="elevated" (click)="onNoClick()">Schließen</button>
    </mat-dialog-actions>
  `,
})
export class DialogComponent {
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
//https://v20.material.angular.dev/components/dialog/overview
