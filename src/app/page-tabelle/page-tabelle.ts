import { Component, computed, effect, inject, signal } from '@angular/core';
import { form, Field, debounce } from '@angular/forms/signals';
import { CO2Data, DatabaseService } from '../service/database-service';
import {
  TabelleComponent,
  TabelleDataViewModel,
} from './components/tabelle-component/tabelle-component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-page-tabelle',
  imports: [Field, TabelleComponent, MatExpansionModule, MatFormFieldModule, MatInputModule],
  template: `
    <h1 class="py-2">Sieh dir den Co2 Verbrauch verschiedener Unternehmen an</h1>
    <mat-expansion-panel class="my-3">
      <mat-expansion-panel-header>Suchfilter</mat-expansion-panel-header>
      <form>
        <label>Land:</label>
        <input type="text" [field]="sucheForm.land" />
        <input type="text" [field]="sucheForm.firma" />
      </form>
    </mat-expansion-panel>

    <app-tabelle-component [viewModels]="tabelleViewModel()"></app-tabelle-component>
  `,
  styles: ``,
})
export class PageTabelle {
  private m_Service = inject(DatabaseService);

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

  // tableModel = computed(async () => {
  //   const suche = this.sucheModel();
  //   const data = await this.m_Service.getData(suche.land, suche.firma);
  //   console.log("Tabelle aktualisiert:", data);
  //   return data;
  // });

  //FrierenStaffel2
  constructor() {
    effect(() => {
      this.m_Service.getData(this.sucheModel().land, this.sucheModel().firma).then((data) => {
        this.tabelleDataModel.set(data);
      });
    });
  }
}

interface SucheData {
  land: string;
  firma: string;
}
