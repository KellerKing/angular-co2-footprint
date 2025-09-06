import { SpaltenModel } from "./components/filtertabelle/spalten-model";

export function createSpaltenViewModels(): SpaltenModel[] {
    return [
      {
        header: 'Unternehmen',
        mappingName: 'company_name',
        filterbar: true,
        sortierbar: true,
      },
      {
        header: 'Land',
        mappingName: 'country',
        filterbar: true,
        sortierbar: true,
      },
      {
        header: 'CO2 Verbrauch',
        mappingName: 'co2_verbrauch',
        sortierbar: true,
      },
    ];
}