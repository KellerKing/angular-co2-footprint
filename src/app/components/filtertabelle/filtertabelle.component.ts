import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { SpaltenDto } from './spaltenDto';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-filtertabelle',
  imports: [MatTableModule, MatSortModule, MatInputModule, MatExpansionModule],
  template: `
    <div class="m-2">
      @if (hasSpaltenZumFiltern()) {

      <div class="mb-4">
        <mat-expansion-panel>
          <mat-expansion-panel-header>
            <mat-panel-title>Filter</mat-panel-title>
          </mat-expansion-panel-header>
          <form class="form-inline bg-light highlight">
            @for (col of getFilterbarSpalten(); track $index) {
            <div class="row">
              <mat-form-field>
                <mat-label>{{ col.header }}</mat-label>
                <input
                  matInput
                  placeholder="{{ col.header }}..."
                  [value]="filterValues.get(col.mappingName)"
                  (input)="changeFilter($event, col.mappingName)"
                />
              </mat-form-field>
            </div>
            }
          </form>
        </mat-expansion-panel>
      </div>
      }
      <table mat-table [dataSource]="dataSource" matSort>
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
    </div>
  `,
  styles: ``,
})
export class FiltertabelleComponent implements AfterViewInit, OnInit {
  spalten: SpaltenDto[] = [];
  daten: Daten[] = [
    { name: 'Max', alter: 25 },
    { name: 'Anna', alter: 30 },
  ];

  filterValues = new Map<string, string>();
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

    for (const filterbareSpalte of this.getFilterbarSpalten()) {
      this.filterValues.set(filterbareSpalte.mappingName, '');
    }
  }

  ngOnInit(): void {
    this.dataSource.filterPredicate = this.filterPredicate;
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
    this.filterValues.set(
      mappingName,
      ($event.target as HTMLInputElement).value
    );

    this.dataSource.filter = JSON.stringify(
      Array.from(this.filterValues.entries())
    );
    console.log(
      'Filter geändert:',
      mappingName,
      'Wert:',
      ($event.target as HTMLInputElement).value
    );
  }

  filterPredicate = (data: Daten, filter: string): boolean => {
    const filterMap = new Map<string, string>(JSON.parse(filter));

    for (const [key, value] of filterMap.entries()) {
      if (!value || value.trim() === '') continue;

      const cellValue = data[key as keyof Daten];
      if (cellValue === undefined || cellValue === null) continue;

      const cellValueStr = String(cellValue).toLowerCase(); //TODO: handle non-string values
      if (!cellValueStr.includes(value.toLowerCase())) {
        return false;
      }
    }
    return true;
  };
}
//tutorial: https://getbootstrap.com/docs/4.0/content/tables/
//https://www.delftstack.com/de/howto/angular/angular-2-sortable-table/
//https://material.angular.dev/components/table/overview

export interface Daten {
  name: string;
  alter: number;
}
