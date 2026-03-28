import {
  AfterViewInit,
  Component,
  computed,
  effect,
  input,
  viewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-tabelle-component',
  imports: [MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './tabelle.component.html',
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

  readonly m_DataSource = new MatTableDataSource<TabelleDataViewModel>([]);
  private readonly m_Sort = viewChild<MatSort>(MatSort);
  private readonly m_Paginator = viewChild<MatPaginator>(MatPaginator);

  private static readonly BASE_PAGE_SIZE_OPTIONS = [5, 10, 25, 50, 100, 250, 500, 1000];
  static readonly MAX_INITIAL_PAGE_SIZE_BEI_NEU_LADEN = 25;

  initPageSize = computed(() => {
    if (this.pageSizes().length === 0) return 0;
    const result = Math.min(
      Math.max(...this.pageSizes()),
      TabelleComponent.MAX_INITIAL_PAGE_SIZE_BEI_NEU_LADEN,
    );

    return result;
  });

  pageSizes = computed(() => {
    const viewModelsLength = this.viewModels().length;
    const basisGefiltert = TabelleComponent.BASE_PAGE_SIZE_OPTIONS.filter(
      (size) => size < viewModelsLength,
    );

    if (basisGefiltert.length === 0) {
      return viewModelsLength > 0 ? [viewModelsLength] : [0];
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

  constructor() {
    effect(() => {
      this.m_DataSource.data = this.viewModels();
      this.updatePaginatorState();
    });
  }
  ngAfterViewInit(): void {
    this.m_DataSource.sort = this.m_Sort();
    this.m_DataSource.paginator = this.m_Paginator();
  }

  getSpaltenNamen(): string[] {
    return this.tabelleTemplateViewModels.map((col) => col.mappingName);
  }

  /**
   * @description
   * Beim laden / Datenänderung durch z.B Suchfilter werden die verfügbaren pageSizeOptions anhand der vorhandenen Einträge ermittelt und gesetzt. 
   * Die pageSize bleibt unverändert wenn der aktuelle Wert in den verfügbaren pageSizeOptions enthalten ist. Ansonsten wird wird der Initialwert gesetzt. Dieser ist 
   * der maximale Wert aus den verf+gbaren PageSizeOptions, maximal aber 25. 
   */
  private updatePaginatorState(): void {
    const paginator = this.m_DataSource.paginator;
    if (!paginator) return;
    //Bewusst hier den Wert speichern da durch das setzten der pageSizeOptions, die Variable wahrscheinlich auf Index  0 zeigt und sich dann ändert. Dadurch würde wenn ich von 0 Einträgen komme immer 5 gesetzt. Und 5 ist immer bei den verfügbaren dabei, darum würde das gegen die 25 als default gewinnen.
    const letzteGenutztePageSize = paginator.pageSize;
    const defaultPageSize = this.initPageSize();
    paginator.pageSizeOptions = this.pageSizes();

    //Für die Zukunft könnte ich mir vorstellen, dass man nicht den default setzt sondern den größten verfügbaren Wert der kleiner als mein zuletzt genutzter Wert ist.
    //Quasi ich stelle 50 ein, suche, habe dann aber nur 40 Einträge, dann würde ich die 40 als neuen default nehmen.
    if (!paginator.pageSizeOptions.includes(letzteGenutztePageSize)) {
      paginator.pageSize = defaultPageSize;
    }

    paginator.firstPage();
    this.m_DataSource._updateChangeSubscription();
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
