import { Component } from '@angular/core';
import {
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-rectliches-component',
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatDialogTitle],
  template: `
    <h1 matDialogTitle>Rechtliche Hinweise</h1>
    <mat-dialog-content
      >Rechtliche Hinweise Impressum Musterfirma GmbH <br />
      Vertreten durch den Geschäftsführer Max Mustermann <br />
      Registergericht: Amtsgericht Musterstadt, HRB 12345 <br />
      Umsatzsteuer-ID: DE 123456789 <br />
      <br />
      Datenschutz Wir erheben und verarbeiten personenbezogene Daten gemäß den Bestimmungen der
      DSGVO. Details zum Umfang, Zweck und zur Dauer der Datenverarbeitung finden Sie in unserer
      vollständigen Datenschutzerklärung. Nutzungsbedingungen Die auf dieser Webseite
      bereitgestellten Inhalte dienen nur zu Informationszwecken. Jegliche Vervielfältigung,
      Verbreitung oder öffentliche Wiedergabe bedarf der vorherigen schriftlichen Zustimmung der
      Musterfirma GmbH. Haftungsausschluss Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir
      keine Haftung für externe Links. Für den Inhalt verlinkter Seiten sind ausschließlich deren
      Betreiber verantwortlich.
      <br />
      <br />
      © 2025 Musterfirma GmbH. Alle Rechte vorbehalten.</mat-dialog-content
    >
    <mat-dialog-actions>
      <button matButton mat-dialog-close class="btn btn-primary">Okay</button>
    </mat-dialog-actions>
  `,
  styles: ``,
})
export class DialogRectlichesTemplate {}
