import { Component, computed, effect, inject, signal } from '@angular/core';
import { form, Field, debounce } from '@angular/forms/signals';
import { CO2Data, DatabaseService } from '../service/database-service';
import { TabelleComponent, TabelleViewModel } from './components/tabelle-component/tabelle-component';

@Component({
  selector: 'app-page-tabelle',
  imports: [Field, TabelleComponent],
  template: `
    <h1>Page asdasdasd</h1>
    <form>
      <label>Land:</label>
      <input type="text" [field]="sucheForm.land" />
      <input type="text" [field]="sucheForm.firma" />
    </form>
    <br>

    <app-tabelle-component [viewModels]="tabelleViewModel()"></app-tabelle-component>
`,
  styles: ``,
})
export class PageTabelle {

  private m_Service = inject(DatabaseService);

  sucheModel = signal<SucheData>({
    land: "",
    firma: ""
  });

  sucheForm = form(this.sucheModel, (schema) => {
    debounce(schema, 300);
  });

  tabelleDataModel = signal<CO2Data[]>([]);
  
  tabelleViewModel = computed<TabelleViewModel[]>(() => {
    return this.tabelleDataModel()
    .map(data => ({
      id: data.id,
      land: data.country,
      firma: data.company_name,
      emissionen: data.co2_emissions
      })
    );
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
      console.log("Suche geändert:", this.sucheModel().land);
      this.m_Service.getData(this.sucheModel().land, this.sucheModel().firma)
      .then((data) => {
        this.tabelleDataModel.set(data);
        }
      );
    });
  }
}


interface SucheData {
  land: string;
  firma: string;
}
