import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { BasePfadHelper } from '../../../helper/base.pfad.helper';
import { UnternehmenModel } from './unternehmen.model';



@Injectable({ providedIn: 'root' })
export class UnternehmenService {
  private readonly m_Url = './db.json';
  private readonly m_Http = inject(HttpClient);
  private readonly m_BasePfadHelper = inject(BasePfadHelper);


  getAlleUnternehmen(): Observable<UnternehmenModel[]> {
    return this.m_Http.get<UnternehmenModel[]>(this.m_BasePfadHelper.getVollstaendigenPfad(this.m_Url));
  }

  getUnternehmen(pageIndex: number, count: number): Observable<UnternehmenModel[]> {
    const startIndex = pageIndex * count;
    if (startIndex < 0) 
      return of([]);

    const result = this.getAlleUnternehmen().pipe(
      map((unternehmen: UnternehmenModel[]) => {
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
