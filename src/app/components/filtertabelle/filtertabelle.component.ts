import  { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SpaltenDto } from './spaltenDto';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, Sort, MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-filtertabelle',
  imports: [MatTableModule, MatSortModule],
  template: `
    <!-- <div class="container">
      @if (hasSpaltenZumFiltern()) {
      <form class="mb-3">
        <span> Filter:</span>
        @for (col of getFilterbarSpalten(); track $index) {
        <input
          type="text"
          [(value)]="filterValue"
          class="form-control mb-3"
          placeholder="{{ col.header }}..."
          attr.aria-label="{{ col.header }}"
          aria-describedby="basic-addon1"
        />
        }
      </form>
      }
      <div class="table-responsive">
        <table class="table table-striped table-hover table-sm">
          <thead class="table-light">
            <tr>
              @for (col of spalten; track $index) {
              <th>{{ col.header }}</th>
              } @empty {
              <th>– keine Spalten –</th>
              }
            </tr>
          </thead>
          <tbody>
            @for (row of daten; track row) {
            <tr>
              @for (col of spalten; track $index) {
              <td>{{ getCellValue(row, col) }}</td>
              }
            </tr>
            }
          </tbody>
        </table>
      </div>
    </div> -->
    <table
      mat-table
      [dataSource]="dataSource"
      class="mat-elevation-z8"
      matSort
      (matSortChange)="announceSortChange($event)"
    >
      <!-- Note that these columns can be defined in any order.
        The actual rendered columns are set as a property on the row definition" -->

      <!-- Spalten Templates definieren -->
      @for (col of spalten; track $index) {
      <ng-container [matColumnDef]="col.mappingName">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>
          {{ col.header }}
        </th>
        <td mat-cell *matCellDef="let element">
          {{ getCellValue(element, col) }}
        </td>
      </ng-container>
      }

      <tr mat-header-row *matHeaderRowDef="getSpaltenNamen()"></tr>
      <tr mat-row *matRowDef="let row; columns: getSpaltenNamen()"></tr>
    </table>
  `,
  styles: ``,
})
export class FiltertabelleComponent implements AfterViewInit {
  spalten: SpaltenDto[] = [];
  daten: Daten[] = [
    { name: 'Max', alter: 25 },
    { name: 'Anna', alter: 30 },
  ];

  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource(this.daten);

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
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  hasSpaltenZumFiltern(): boolean {
    return this.spalten.some((col) => col.filterbar);
  }

  getFilterbarSpalten(): SpaltenDto[] {
    return this.spalten.filter((col) => col.filterbar);
  }

  getSpaltenNamen(): string[] {
    return this.spalten.map((col) => col.mappingName);
  }

  announceSortChange(sortState: Sort) {
    console.log('Sort changed:', sortState);
  }

  getCellValue(row: Daten, col: SpaltenDto): any {
    const m = col.mappingName;
    return row[m as keyof Daten];
  }
}
//tutorial: https://getbootstrap.com/docs/4.0/content/tables/
//https://www.delftstack.com/de/howto/angular/angular-2-sortable-table/
//https://material.angular.dev/components/table/overview

export interface Daten {
  name: string;
  alter: number;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
