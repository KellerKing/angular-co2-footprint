import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { form, Field, debounce } from '@angular/forms/signals';
import { CO2Data, DatabaseService } from '../../service/database-service';
import {
  TabelleComponent,
  TabelleDataViewModel,
} from './components/tabelle-component/tabelle-component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LokaleNavigationService } from '../../service/lokale-navigation.service';

@Component({
  selector: 'app-page-tabelle',
  imports: [
    Field,
    TabelleComponent,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  template: `
    <h1 class="p-2">Sieh dir den Co2 Verbrauch verschiedener Unternehmen an</h1>
    
    <div>
      <mat-expansion-panel class="my-3">
        <mat-expansion-panel-header>Suchfilter</mat-expansion-panel-header>
        <form>
          <p>
            Die Suche erfolgt ungenau, d.h. es werden auch Teilausdrücke gefunden. Eine Suche nach
            "Ger" im Land findet z.B. "Germany", genauso wie die Suche nach "many" auch "Germany"
            findet. Das ist auch für Firmennamen so und eine bewusst gewählte Funktionalität.
          </p>
          <div class="form-group mb-2">
            <label for="land">Land:</label>
            <input type="text" [field]="sucheForm.land" id="land" class="form-control" />
          </div>
          <div class="form-group">
            <label for="firma">Firma:</label>
            <input type="text" [field]="sucheForm.firma" id="firma" class="form-control" />
          </div>
        </form>
      </mat-expansion-panel>

      <section id="tabelle">
        <app-tabelle-component [viewModels]="tabelleViewModel()"></app-tabelle-component>
      </section>
    </div>
  `,
  styles: ``,
})
export class PageTabelle implements OnInit {
  private readonly m_Service = inject(DatabaseService);
  private readonly m_NavigationService = inject(LokaleNavigationService);

  sucheModel = signal<SucheData>({
    land: '',
    firma: '',
  });

  sucheForm = form(this.sucheModel, (schema) => {
    debounce(schema, 300);
  });

  tabelleDataModel = signal<CO2Data[]>([]);

  tabelleViewModel = computed<TabelleDataViewModel[]>(() => {
    return this.tabelleDataModel().map((data) => ({
      id: data.id,
      land: data.country,
      firma: data.company_name,
      emissionen: data.co2_verbrauch || -1,
    }));
  });

  navigationItems = [
    { label: 'Tabelle', fragment: 'tabelle' },
    { label: 'B', fragment: 'B' },
    { label: 'C', fragment: 'C' },
  ];

  constructor() {
    effect(() => {
      this.m_Service.getData(this.sucheModel().land, this.sucheModel().firma).then((data) => {
        this.tabelleDataModel.set(data);
      });
    });
  }

  ngOnInit(): void {
    this.m_NavigationService.nutzeNavigation(this.navigationItems);
  }
}

interface SucheData {
  land: string;
  firma: string;
}
