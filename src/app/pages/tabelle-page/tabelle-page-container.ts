import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UnternehmenService } from '../../service/unternehmen/unternehmen.service';
import { FilterTabelleContainer } from './components/filtertabelle/filtertabelle.container';
import { DialogFacade } from '../../facade/dialog-facade';

@Component({
  selector: 'app-tabelle-page-container',
  imports: [FilterTabelleContainer],
  template: `
    <app-filtertabelle-container 
    (fehlerInEingabeGefunden)="onFehlerInEingabeGefunden($event)"
    [daten]="unternehmen"> </app-filtertabelle-container>
  `,
  styles: ``,
})
export class TabellePageContainer {
  private readonly m_UnternehmenService = inject(UnternehmenService);
  private readonly m_DialogFacade = inject(DialogFacade);

  unternehmen: Observable<any[]>;

  onFehlerInEingabeGefunden(error: string[]) {
    const message = this.createErrorMessage(error);
    this.m_DialogFacade.openFehlerDialog(message);  
  }

  private createErrorMessage(fehler: string[]): string {
    return fehler.join('\n');
  }

  constructor() {
    this.unternehmen = this.m_UnternehmenService.getAlleUnternehmen();
  }
}
