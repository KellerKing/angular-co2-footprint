import { Component, computed, effect, inject, input, signal, viewChild, ViewChild } from '@angular/core';
import { required } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-tabelle-component',
  imports: [JsonPipe, MatTableModule, MatSortModule],
  template: `
    <p>Tabelle Component works!</p>

    <table mat-table [dataSource]="dataSource()" matSort class="mat-elevation-z8">
      @for (item of tabelleTemplateViewModels; track $index) {
        <ng-container [matColumnDef]="item.mappingName">
        
          @if (item.isSortierbar) {
            <th mat-header-cell *matHeaderCellDef mat-sort-header> {{ item.displayText }} </th>
          } 
          @else {
            <th mat-header-cell *matHeaderCellDef> {{ item.displayText }} </th>
          }

          <td mat-cell *matCellDef="let element"> {{ element[item.mappingName] || "" }} </td>
        </ng-container>

      }  

      <tr mat-header-row *matHeaderRowDef="getSpaltenNamen()"></tr>
      <tr mat-row *matRowDef="let row; columns: getSpaltenNamen()"></tr>
    </table>

    <pre>{{ viewModels() | json }}</pre>
  `,
  styles: [``],
})
export class TabelleComponent {
  viewModels = input.required<TabelleDataViewModel[]>();
  dataSource = computed(() => {
    const result = new MatTableDataSource(this.viewModels());
    result.sort = this.sort;
    return result;
  });
  
  @ViewChild(MatSort) sort!: MatSort;

  tabelleTemplateViewModels: TabelleTemplateViewModel[] = [
    {
      displayText: "Land",
      mappingName: "land",
      isSortierbar: true
    },
    {
      displayText: "Firma",
      mappingName: "firma",
      isSortierbar: true
    },
    {
      displayText: "Emissionen",
      mappingName: "emissionen",
      isSortierbar: true
    }
  ];


  getSpaltenNamen(): string[] {
    return this.tabelleTemplateViewModels.map((col) => col.mappingName);
  }
}

export interface TabelleDataViewModel { 
  id: number;
  land: string;
  firma: string;
  emissionen: number;
}

interface TabelleTemplateViewModel {
  displayText: string;
  mappingName: string;
  isSortierbar: boolean
}
