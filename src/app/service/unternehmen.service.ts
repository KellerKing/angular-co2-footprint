import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { APP_BASE_HREF } from '@angular/common';

export interface Unternehmen {
  name: string;
  land: string;
  countryCode: string;
  branche: string;
  co2Verbrauch: number;
  id: number;
}

@Injectable({ providedIn: 'root' })
export class UnternehmenService {
  private readonly m_Url = './db.json';
  private readonly m_Http = inject(HttpClient);
  private readonly m_BaseHref = inject(APP_BASE_HREF, { optional: true }) ?? '/';


  getAlleUnternehmen(): Observable<Unternehmen[]> {
    return this.m_Http.get<Unternehmen[]>(this.getPfad(this.m_BaseHref, this.m_Url));
  }

  getUnternehmen(pageIndex: number, count: number): Observable<Unternehmen[]> {
    const startIndex = pageIndex * count;
    if (startIndex < 0) 
      return of([]);

    const result = this.getAlleUnternehmen().pipe(
      map((unternehmen: Unternehmen[]) => {
        return unternehmen.slice(startIndex, startIndex + count);
      }),
      catchError((error) => {
        console.error('Fehler beim Laden der Unternehmen:', error);
        return of([]); // Rückgabe eines leeren Arrays bei Fehler
      })
    );
    return result;
  }

  private getPfad(basePfad : string, realtiverPfad: string) : string {
    const linkerTeil = basePfad.endsWith('/') ? basePfad.slice(0, -1) : basePfad;
    return `${linkerTeil}/${realtiverPfad}`;
  }
}

//https://www.youtube.com/watch?v=-jRxG84AzCI

//https://www.youtube.com/watch?v=NQBWxlQ_m9U
