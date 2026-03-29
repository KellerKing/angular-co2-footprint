import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { form, debounce, FormField } from '@angular/forms/signals';
import { CO2Data, DatabaseService } from '../../service/database.service/database.service';
import {
  TabelleComponent,
  TabelleDataViewModel,
} from './components/tabelle-component/tabelle.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LokaleNavigationService } from '../../service/lokale-navigation.service';

@Component({
  selector: 'app-page-tabelle',
  imports: [FormField, TabelleComponent, MatExpansionModule, MatFormFieldModule, MatInputModule],
  templateUrl: './page-tabelle.html',
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

  constructor() {
    effect(() => {
      this.m_Service.getData(this.sucheModel().land, this.sucheModel().firma).then((data) => {
        this.tabelleDataModel.set(data);
      });
    });
  }

  ngOnInit(): void {
    const navigationItems = [
      { label: 'Suchfilter', fragment: 'suchfilter' },
      { label: 'Tabelle', fragment: 'tabelle' },
      { label: 'Zusätzliche Informationen', fragment: 'zusaetzliche-informationen' },
      { label: 'Zum Footer', fragment: 'ende' },
    ];

    this.m_NavigationService.nutzeNavigation(navigationItems);
  }
}

interface SucheData {
  land: string;
  firma: string;
}
