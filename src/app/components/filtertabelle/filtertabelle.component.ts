import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SpaltenDto } from './spaltenDto';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-filtertabelle',
  imports: [MatTableModule, MatSortModule],
  template: `
    @if (hasSpaltenZumFiltern()) {
    <form class="form-inline m-2 p-2 bg-light highlight">
      @for (col of getFilterbarSpalten(); track $index) {
      <div class="form-row align-items-center mb-3">
        <label for="{{ col.mappingName }}">{{ col.header }}</label>
        <div class="col-auto">
          <input
            type="text"
            class="form-control"
            id="{{ col.mappingName }}"
            (input)="changeFilter($event, col.mappingName)"
            placeholder="{{ col.header }}..."
          />
        </div>
      </div>
      }
    </form>
    }
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8" matSort>
      <!-- Note that these columns can be defined in any order.
        The actual rendered columns are set as a property on the row definition" -->

      <!-- Spalten Templates definieren -->
      @for (col of spalten; track $index) {
      <ng-container [matColumnDef]="col.mappingName">
        @if (col.sortierbar) {
        <th mat-header-cell *matHeaderCellDef mat-sort-header>
          {{ col.header }}
        </th>
        } @else {
        <th mat-header-cell *matHeaderCellDef>
          {{ col.header }}
        </th>
        }

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

  filterValues: { [key: string]: string } = {};
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource(this.daten);

  constructor() {
    // Beispielhafte Initialisierung
    this.spalten = [
      {
        mappingName: 'name',
        header: 'Name',
        filterbar: true,
        sortierbar: false,
      },
      {
        mappingName: 'alter',
        header: 'Alter',
        filterbar: true,
        sortierbar: true,
      },
    ];

    this.filterValues = this.getFilterbarSpalten().reduce((acc, col) => {
      acc[col.mappingName] = '';
      return acc;
    }, {} as { [key: string]: string });
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

  getCellValue(row: Daten, col: SpaltenDto): any {
    return row[col.mappingName as keyof Daten];
  }

  changeFilter($event: Event, mappingName: string) {
    this.filterValues[mappingName] = ($event.target as HTMLInputElement).value;

    this.dataSource.filter = JSON.stringify(this.filterValues);
    console.log('Filter geändert:', mappingName, 'Wert:', ($event.target as HTMLInputElement).value);
  }
}
//tutorial: https://getbootstrap.com/docs/4.0/content/tables/
//https://www.delftstack.com/de/howto/angular/angular-2-sortable-table/
//https://material.angular.dev/components/table/overview

export interface Daten {
  name: string;
  alter: number;
}
