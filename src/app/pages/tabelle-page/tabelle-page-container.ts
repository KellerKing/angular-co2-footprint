import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterTabelleContainer } from './components/filtertabelle/filtertabelle.container';
import { DialogFacade } from '../../facade/dialog-facade';
import { UnternehmenFacade } from '../../facade/unternehmen-facade';

@Component({
  selector: 'app-tabelle-page-container',
  imports: [FilterTabelleContainer],
  template: `
    <app-filtertabelle-container 
    (fehlerInEingabeGefunden)="onFehlerInEingabeGefunden($event)"
    [daten]="unternehmen"
    [anzahlDaten]="anzahlDaten"> </app-filtertabelle-container>
  `,
  styles: ``,
})
export class TabellePageContainer {
  private readonly m_UnternehmenFacade = inject(UnternehmenFacade);
  private readonly m_DialogFacade = inject(DialogFacade);

  unternehmen: Observable<any[]>;
  anzahlDaten: Observable<number>;

  onFehlerInEingabeGefunden(error: string[]) {
    const message = this.createErrorMessage(error);
    this.m_DialogFacade.openFehlerDialog(message);  
  }

  private createErrorMessage(fehler: string[]): string {
    return fehler.join('\n');
  }

  constructor() {
    this.unternehmen = this.m_UnternehmenFacade.getAlleUnternehmen();
    this.anzahlDaten = this.m_UnternehmenFacade.getAnzahlUnternehmen();
  }
}
