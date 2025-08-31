import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UnternehmenService } from '../../service/unternehmen.service';
import { FiltertabelleComponent } from './components/filtertabelle/filtertabelle.component';
import { SpaltenModel } from './components/filtertabelle/spalten-model';

@Component({
  selector: 'app-tabelle-page-container',
  imports: [FiltertabelleComponent],
  template: `
    <app-filtertabelle
      [inputData]="this.unternehmen"
      [inputSpalten]="this.spalten"
    ></app-filtertabelle>
  `,
  styles: ``,
})
export class TabellePageContainer {
  private readonly m_UnternehmenService = inject(UnternehmenService);

  unternehmen: Observable<any[]>;
  spalten: SpaltenModel[] = [];

  constructor() {
    this.unternehmen = this.m_UnternehmenService.getAlleUnternehmen();
    this.spalten = this.getSpalten();
  }

  getSpalten(): SpaltenModel[] {
    return [
      {
        header: 'Unternehmen',
        mappingName: 'company_name',
        filterbar: true,
        sortierbar: true,
      },
      {
        header: 'Land',
        mappingName: 'country',
        filterbar: true,
        sortierbar: true,
      },
      {
        header: 'CO2 Verbrauch',
        mappingName: 'co2_verbrauch',
        sortierbar: true,
      },
    ];
  }
}
