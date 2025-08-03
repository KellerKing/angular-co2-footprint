import {
  AfterViewInit,
  Component,
  ViewChild,
  OnInit,
  input,
  Input,
  inject,
} from '@angular/core';
import { SpaltenDto } from './spaltenDto';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import { Observable, map, take } from 'rxjs';
import { TabelleDataService } from '../../service/tabelleDataService';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {
  Unternehmen,
  UnternehmenService,
} from '../../service/unternehmen.service';
import { AsyncPipe } from '@angular/common';

@Component({
  imports: [
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatExpansionModule,
    MatPaginatorModule,
    AsyncPipe,
  ],
  selector: 'app-filtertabelle',
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
      <div class="mat-elevation-z8">
        <table mat-table [dataSource]="(dataSource | async) ?? []" matSort>
          <!-- Note that these columns can be defined in any order.
        The actual rendered columns are set as a property on the row definition" -->

          <!-- Spalten Templates definieren -->
          @for (col of inputSpalten; track $index) {
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

        @if (pagingEnabled) {
        <mat-paginator
          [pageSizeOptions]="[5, 10, 20]"
          [pageSize]="pageSize"
          [showFirstLastButtons]="true"
        >
        </mat-paginator>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class FiltertabelleComponent implements AfterViewInit, OnInit {
  @Input() inputData!: Observable<Unternehmen[]>;
  @Input() inputSpalten: SpaltenDto[] = [];
  @Input() pageSize: number = 20;
  @Input() pagingEnabled: boolean = false;

  filterValues = new Map<string, string>();
  dataSource!: Observable<MatTableDataSource<Unternehmen>>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    for (const filterbareSpalte of this.getFilterbarSpalten()) {
      this.filterValues.set(filterbareSpalte.mappingName, '');
    }
  }

  ngOnInit(): void {
    //this.dataSource.filterPredicate = this.filterPredicate;
    // this.dataSource.paginator = this.paginator;
    this.dataSource = this.inputData.pipe(
      map((data) => new MatTableDataSource<Unternehmen>(data))
    );
    console.log(
      'FiltertabelleComponent initialized with data:',
      this.inputData
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.pipe(take(1)).subscribe((ds) => {
      ds.paginator = this.paginator;
      ds.sort = this.sort;
      ds.filterPredicate = this.filterPredicate;
      console.log('DataSource initialized with paginator and sort:', ds);
    });
    // this.dataSource.sort = this.sort;
  }

  hasSpaltenZumFiltern(): boolean {
    return this.inputSpalten.some((col) => col.filterbar);
  }

  getFilterbarSpalten(): SpaltenDto[] {
    return this.inputSpalten.filter((col) => col.filterbar);
  }

  getSpaltenNamen(): string[] {
    return this.inputSpalten.map((col) => col.mappingName);
  }

  getCellValue(row: Unternehmen, col: SpaltenDto): any {
    return row[col.mappingName as keyof Unternehmen];
  }

  changeFilter($event: Event, mappingName: string) {
    this.filterValues.set(
      mappingName,
      ($event.target as HTMLInputElement).value
    );

    // this.dataSource.filter = JSON.stringify(
    //   Array.from(this.filterValues.entries())
    // );
  }

  filterPredicate = (data: Unternehmen, filter: string): boolean => {
    const filterMap = new Map<string, string>(JSON.parse(filter));

    console.log('Filter predicate called with:', filterMap);

    for (const [key, value] of filterMap.entries()) {
      if (!value || value.trim() === '') continue;

      const cellValue = data[key as keyof Unternehmen];
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
