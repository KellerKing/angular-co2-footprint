import {
  AfterViewInit,
  Component,
  ViewChild,
  Input,
  inject,
} from '@angular/core';
import { SpaltenModel } from './spalten-model';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import { Observable } from 'rxjs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Sanitizer } from '../../../../service/sanitizer/sanitizer';

@Component({
  imports: [
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatExpansionModule,
    MatPaginatorModule,
  ],
  selector: 'app-filtertabelle',
  template: `
    <div class="m-2">
      @if (hasSpaltenZumFiltern()) {

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

        @if (pagingEnabled) {
        <mat-paginator
          [pageSizeOptions]="[5, 10, 20, 50, 100, 200, 500, 1000]"
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
export class FiltertabelleComponent implements AfterViewInit {
  @Input() inputData!: Observable<any[]>;
  @Input() inputSpalten: SpaltenModel[] = [];
  @Input() pageSize: number = 20;
  @Input() pagingEnabled: boolean = true;

  filterValues = new Map<string, string>();
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private readonly m_Sanitizer = inject(Sanitizer);

  ngAfterViewInit(): void {
    this.inputData.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.filterPredicate = this.filterPredicate;
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
    const sanitizeResult = this.m_Sanitizer.sanitize(target.value);

    if (sanitizeResult.hasFehler) {
      const ausgabe = sanitizeResult.fehler.join(", \r\n");
      alert("Fehlerhafte Zeichen erkannt:" + "\r\n" + ausgabe);
      target.value = sanitizeResult.wertOhneFehler;
    }

    this.filterValues.set(mappingName, target.value);

    const filter = Array.from(this.filterValues.entries());
    this.dataSource.filter = JSON.stringify(filter);

    this.dataSource.paginator?.firstPage();
    this.dataSource.sort?.sortChange.emit();
  }

  filterPredicate = (data: any, filter: string): boolean => {
    const filterMap = new Map<string, string>(JSON.parse(filter));

    for (const [key, value] of filterMap.entries()) {
      if (!value || value.trim() === '') continue;

      const cellValue = data[key as keyof any];
      if (cellValue === undefined || cellValue === null) continue;

      //Es werden nur Strings verglichen weil die Filterung auf Textfelder abzielt
      const cellValueStr = String(cellValue).toLowerCase();
      if (!cellValueStr.includes(value.toLowerCase())) {
        return false;
      }
    }
    return true;
  };
}
