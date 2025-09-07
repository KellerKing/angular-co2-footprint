import { Component, inject, input, OnInit, output } from '@angular/core';
import { FiltertabelleComponent } from './filtertabelle.component';
import { Sanitizer } from './sanitizer/sanitizer';
import { Observable } from 'rxjs';

import { createSpaltenViewModels } from '../../viewmodel-creator';
import { SpaltenModel } from './spalten-model';

@Component({
  selector: 'app-filtertabelle-container',
  imports: [FiltertabelleComponent],
  template: `
    <app-filtertabelle-component 
    (filterChanged)="onFilterChanged($event)"
    [filterValue]="currentTextInput"
    [inputData]="daten()"
    [pageSizes]="this.pageSizes"
    [inputSpalten]="createSpaltenViewModels()"> </app-filtertabelle-component>
  `,
  styles: ``,
})

export class FilterTabelleContainer implements OnInit {
  private readonly m_Sanitzier = inject(Sanitizer);
  
  daten = input.required<Observable<any[]>>();
  anzahlDaten = input.required<Observable<number>>(); 

  fehlerInEingabeGefunden = output<string[]>()
  currentTextInput: { mappingName: string; value: string } | null = null;
  pageSizes!: number[];
  defaultSize!: number;

  onFilterChanged(eingabe: { mappingName: string; value: string }) {
    const sanitizeResult = this.m_Sanitzier.sanitize(eingabe.value);
    this.currentTextInput = {
      mappingName: eingabe.mappingName,
      value: sanitizeResult.wertOhneFehler,
    };
    
    if (sanitizeResult.hasFehler) {
      this.fehlerInEingabeGefunden.emit(sanitizeResult.fehler);
    }
  }

  ngOnInit() {
    console.log('FilterTabelleContainer.ngOnInit');
    this.anzahlDaten().subscribe((anzahl) => {
      this.pageSizes = this.ErmittlePaginationGroessen(anzahl);
      this.defaultSize = this.pageSizes.includes(20) ? 20 : this.pageSizes[0];
    });
  }

  ErmittlePaginationGroessen(anzahlDatensaetze: number): number[] {
    const festeGroessen = [5, 10, 25, 50, 100, 250, 500, 1000];
    const groesseMinimal = 5;

    if (anzahlDatensaetze <= groesseMinimal) {
      return [anzahlDatensaetze];
    }

    const result = festeGroessen.filter((groesse) => groesse < anzahlDatensaetze);
    result.push(anzahlDatensaetze);
    return result;
  }

  createSpaltenViewModels = createSpaltenViewModels;
}