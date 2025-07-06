import { Component } from '@angular/core';
import { SpaltenDto } from './spaltenDto';

@Component({
  selector: 'app-filtertabelle',
  imports: [],
  template: `
    <div class="table-responsive">
      <table class="table table-striped table-hover table-sm">
        <thead class="table-light">
          <tr>
            @for (col of spalten; track $index) {
            <th> {{ col.header }} </th>
            } @empty {
            <th>– keine Spalten –</th>
            }
          </tr>
        </thead>
        <tbody>
          @for (row of daten; track row) {
          <tr>
            @for (col of spalten; track  $index) {
            <td> {{ getCellValue(row, col) }}</td>
            }
          </tr>  
          }
        </tbody>
      </table>
    </div>
  `,
  styles: ``,
})
export class FiltertabelleComponent {
  spalten: SpaltenDto<Daten>[] = [];
  daten: Daten[] = [];

  constructor() {
    // Beispielhafte Initialisierung
    this.spalten = [
      {
        mappingName: 'name',
        header: 'Name',
        filterbar: true,
        sortierbar: true,
      },
      {
        mappingName: 'alter',
        header: 'Alter',
        filterbar: true,
        sortierbar: true,
      },
    ];
    this.daten = [
      { name: 'Max', alter: 25 },
      { name: 'Anna', alter: 30 },
    ];
  }

  getCellValue(row: Daten, col: SpaltenDto<Daten>): any {
    const m = col.mappingName;

    // 1) Falls es eine Funktion ist, rufe sie auf
    //if (typeof m === 'function') {
    //  return m(row);
    //}

    // 2) String-Mapping: kann "prop" oder "nested.prop" sein
    if (typeof m === 'string') {
      // Wenn kein Punkt, einfache Property
      if (!m.includes('.')) {
        return row[m as keyof Daten];
      }
      // Verschachtelter Pfad: splitten und rekursiv runtergehen
      return (m as string)
        .split('.')
        .reduce((acc: any, key: string) => acc?.[key], row);
    }

    return null;
  }
}
//tutorial: https://getbootstrap.com/docs/4.0/content/tables/

export interface Daten {
  name: string;
  alter: number;
}
