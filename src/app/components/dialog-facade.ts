import { inject, Injectable, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogRechtlichesComponent } from './dialog-anzeige/dialog-anzeige-component';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DialogFacade {
  private readonly m_Dialog = inject(MatDialog);

  openFehlerDialog(fehlerzeichen: string): void {
    this.m_Dialog.open(DialogRechtlichesComponent, {
      disableClose: true,
      data: {
        titel: 'Fehler bei der Eingabe!', 
        datacontent: 'Sonderzeichen oder Programmbefehle können nicht zur Suche verwendet werden. Bitte vermeiden Sie: ' + fehlerzeichen,
        isHtmlSicher: false}
      });
  }

  openModalDialogMitHtml(titel: string, inhalt: string) {
   this.m_Dialog.open(DialogRechtlichesComponent, {
      disableClose: true,
      data: {
        titel: titel, 
        datacontent: inhalt,
        isHtmlSicher: true}
      });
  }

  openModal<TData = any, TResult = any>(
    template: TemplateRef<any>,
    data: TData
  ) {
    const result = this.m_Dialog
      .open(DialogRechtlichesComponent, {
        data: { template, data },
      })
      .afterClosed() as Observable<TResult | undefined>;
  }
}
