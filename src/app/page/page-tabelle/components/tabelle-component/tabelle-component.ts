import { AfterViewInit, Component, computed, effect, input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-tabelle-component',
  imports: [MatTableModule, MatSortModule, MatPaginatorModule],
  template: `
    <table mat-table [dataSource]="dataSource()" matSort class="mat-elevation-z8">
      @for (item of tabelleTemplateViewModels; track $index) {
        <ng-container [matColumnDef]="item.mappingName">
          @if (item.isSortierbar) {
            <th mat-header-cell *matHeaderCellDef mat-sort-header>{{ item.displayText }}</th>
          } @else {
            <th mat-header-cell *matHeaderCellDef>{{ item.displayText }}</th>
          }

          <td mat-cell *matCellDef="let element">{{ element[item.mappingName] || '' }}</td>
        </ng-container>
      }

      <tr mat-header-row *matHeaderRowDef="getSpaltenNamen()"></tr>
      <tr mat-row *matRowDef="let row; columns: getSpaltenNamen()"></tr>
    </table>

    <mat-paginator [pageSizeOptions]="pageSizes()" showFirstLastButtons> </mat-paginator>
  `,
  styles: [
    `
      :host {
        --mat-select-panel-background-color: rgb(255, 255, 255);
        --mat-select-enabled-trigger-text-color: rgb(0, 0, 0);
      }
    `,
  ],
})
export class TabelleComponent implements AfterViewInit {
  viewModels = input.required<TabelleDataViewModel[]>();

  private readonly m_DataSource = new MatTableDataSource<TabelleDataViewModel>([]);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = computed(() => {
    this.m_DataSource.data = this.viewModels();
    return this.m_DataSource;
  });

  pageSizes = computed(() => {
    const viewModelsLength = this.viewModels().length;
    console.log('Berechne pageSizes basierend auf Länge der ViewModels:', viewModelsLength);
    let basis = [5, 10, 25, 50, 100, 250, 500, 1000];
    let basisGefiltert = basis.filter((size) => size < viewModelsLength);

    if (basisGefiltert.length === 0) {
      return viewModelsLength > 0 ? [viewModelsLength] : basis;
    }

    if (basisGefiltert[basisGefiltert.length - 1] !== viewModelsLength) {
      basisGefiltert.push(viewModelsLength);
    }

    return basisGefiltert.sort((a, b) => a - b);
  });

  tabelleTemplateViewModels: TabelleTemplateViewModel[] = [
    {
      displayText: 'Land',
      mappingName: 'land',
      isSortierbar: true,
    },
    {
      displayText: 'Firma',
      mappingName: 'firma',
      isSortierbar: true,
    },
    {
      displayText: 'Emissionen',
      mappingName: 'emissionen',
      isSortierbar: true,
    },
  ];

  ngAfterViewInit(): void {
    this.m_DataSource.sort = this.sort;
    this.m_DataSource.paginator = this.paginator;
  }

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
  isSortierbar: boolean;
}
