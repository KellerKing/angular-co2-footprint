import {
  AfterViewInit,
  Component,
  ViewChild,
  Input,
  output,
} from '@angular/core';
import { SpaltenModel } from './spalten-model';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import { Observable } from 'rxjs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { evaluateFilterPredicate } from './tabelle-helper';

@Component({
  imports: [
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatExpansionModule,
    MatPaginatorModule,
  ],
  selector: 'app-filtertabelle-component',
  template: `
    <div class="m-2">
      @if (hasSpaltenZumFiltern() && dataSource !== undefined && dataSource.data.length > 0) {
      <div>
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
                  value="{{ getFilterValue(col.mappingName) }}"
                  (input)="changeFilter($event, col.mappingName)"
                  [maxLength]="100"
                />
              </mat-form-field>
            </div>
            }
          </form>
        </mat-expansion-panel>
      </div>
      }
      <div class="mat-elevation-z8">
        <table mat-table [dataSource]="dataSource" matSort>
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

        <mat-paginator
          [pageSizeOptions]="pageSizes"
          [pageSize]="defaultPageSize"
          [showFirstLastButtons]="true"
        >
        </mat-paginator>
      </div>
    </div>
  `,
  styles: ``,
})
export class FiltertabelleComponent implements AfterViewInit {
  @Input() inputData!: Observable<any[]>;
  @Input() inputSpalten: SpaltenModel[] = [];
  @Input() pageSizes!: number[];
  @Input() defaultPageSize = 20;


  @Input() set filterValue(value:{ mappingName: string; value: string } | null) {
    if (!value) return;
    this.filterValues.set(value.mappingName, value.value);
    this.applyFilter();
  }
  
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  filterChanged = output<{ mappingName: string; value: string }>();
  filterValues = new Map<string, string>();
  dataSource!: MatTableDataSource<any>;

  ngAfterViewInit(): void {
    this.inputData.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.filterPredicate = evaluateFilterPredicate;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  hasSpaltenZumFiltern(): boolean {
    return this.inputSpalten.some((col) => col.filterbar);
  }

  getFilterValue(mappingName: string): string {
    return this.filterValues.get(mappingName) || '';
  }

  getFilterbarSpalten(): SpaltenModel[] {
    return this.inputSpalten.filter((col) => col.filterbar);
  }

  getSpaltenNamen(): string[] {
    return this.inputSpalten.map((col) => col.mappingName);
  }

  getCellValue(row: any, col: SpaltenModel): any {
    return row[col.mappingName as keyof any];
  }

  changeFilter($event: Event, mappingName: string) {
    const target = $event.target as HTMLInputElement;
    const text = target.value;
    target.value = this.getFilterValue(mappingName); //Setzt den Wert zurück, falls er durch Sanitizer verändert wurde
    
    this.filterChanged.emit({ mappingName: mappingName, value: text});
  }

  applyFilter() {
    const filter = Array.from(this.filterValues.entries());
    this.dataSource.filter = JSON.stringify(filter);

    this.dataSource.paginator?.firstPage();
    this.dataSource.sort?.sortChange.emit();
  }
}
