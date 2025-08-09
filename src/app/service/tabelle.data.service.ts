import { inject, Injectable } from '@angular/core';
import { UnternehmenService } from './unternehmen.service';
import { SpaltenDto } from '../components/filtertabelle/spaltenDto';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TabelleDataService {
  m_UnternehmenService = inject(UnternehmenService);

  getSpalten(): SpaltenDto[] {
    return [
      {
        header: 'Unternehmen',
        mappingName: 'company_name',
        filterbar: true,
        sortierbar: true,
      },
      { header: 'Land', mappingName: 'country', filterbar: true, sortierbar: true },
      { header: 'CO2 Verbrauch', mappingName: 'co2_verbrauch', sortierbar: true },
    ];
  }

  getDaten(): Observable<any[]> {
    const unternehmen = this.m_UnternehmenService.getAlleUnternehmen();
    return unternehmen;
  }
}
