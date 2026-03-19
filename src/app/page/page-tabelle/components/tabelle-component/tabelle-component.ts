import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
  viewChild,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

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

    <mat-paginator
      [length]="100"
      [pageSize]="10"
      [pageSizeOptions]="[5, 10, 25, 100]"
    >
    </mat-paginator>
  `,
  styles: [``],
})
export class TabelleComponent {
  viewModels = input.required<TabelleDataViewModel[]>();
  
  dataSource = computed(() => {
    const result = new MatTableDataSource(this.viewModels());
    result.sort = this.sort;
    result.paginator = this.paginator;
    return result;
  });

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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

interface paginatorModel {
  length: number;
  pageSize: number;
  pageIndex: number;
}
