import { Component, effect, inject, input, signal } from '@angular/core';
import { required } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-tabelle-component',
  imports: [JsonPipe],
  template: `
    <p>Tabelle Component works!</p>
    <pre>{{ viewModels() | json }}</pre>
  `,
  styles: [``],
})
export class TabelleComponent {
  viewModels = input.required<TabelleViewModel[]>();
}

export interface TabelleViewModel { 
  id: number;
  land: string;
  firma: string;
  emissionen: number;
}
