import { Component, inject, input, output } from '@angular/core';
import { FiltertabelleComponent } from './filtertabelle.component';
import { Sanitizer } from './sanitizer/sanitizer';
import { Observable } from 'rxjs';

import { createSpaltenViewModels } from './viewmode-creator';
import { SpaltenModel } from './spalten-model';

@Component({
  selector: 'app-filtertabelle-container',
  imports: [FiltertabelleComponent],
  template: `
    <app-filtertabelle-component 
    (filterChanged)="onFilterChanged($event)"
    [filterValue]="currentTextInput"
    [inputData]="daten()"
    [inputSpalten]="createSpaltenViewModels()"> </app-filtertabelle-component>
  `,
  styles: ``,
})
export class FilterTabelleContainer {
  private readonly m_Sanitzier = inject(Sanitizer);
  daten = input.required<Observable<any[]>>(); 

  fehlerInEingabeGefunden = output<string[]>()
  currentTextInput: { mappingName: string; value: string } | null = null;

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

  createSpaltenViewModels = createSpaltenViewModels;
}