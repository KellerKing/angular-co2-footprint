import { Component, inject, OnInit } from '@angular/core';
import { FiltertabelleComponent } from '../../components/filtertabelle/filtertabelle.component';
import {
  Unternehmen,
  UnternehmenService,
} from '../../service/unternehmen.service';
import { TabelleDataService } from '../../service/tabelleDataService';
import { SpaltenDto } from '../../components/filtertabelle/spaltenDto';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-tabelle-page',
  imports: [FiltertabelleComponent],
  template: `
    <p>tabelle-page works!</p>
    <app-filtertabelle 
    [inputData]="this.unternehmen"
    [inputSpalten]="this.spalten"></app-filtertabelle>
  `,
  styles: ``,
})
export class TabellePageComponent {
  tabelleDataService = inject(TabelleDataService);

  unternehmen : Observable<Unternehmen[]>;
  spalten : SpaltenDto[] = [];

  constructor() {
    this.unternehmen = this.tabelleDataService.getUnternehmen();
    this.spalten = this.tabelleDataService.getSpalten();
    console.log('TabellePageComponent initialized with data:', this.unternehmen);
  }
}
