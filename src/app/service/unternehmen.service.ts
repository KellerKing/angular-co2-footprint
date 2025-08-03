import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

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
  //private http = inject(HttpClient);
  private m_Url = '/db.json';
  private m_Http = inject(HttpClient);


  getAlleUnternehmen(): Observable<Unternehmen[]> {
    return this.m_Http.get<Unternehmen[]>(this.m_Url).pipe(map((data: Unternehmen[]) => {return data.slice(0, 20);}));
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
}

//https://www.youtube.com/watch?v=-jRxG84AzCI

//https://www.youtube.com/watch?v=NQBWxlQ_m9U
