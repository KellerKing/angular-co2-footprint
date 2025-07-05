import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

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
  

  getAlleUnternehmen(): Observable<Unternehmen[]> {
    return of([
      {
        name: 'Unternehmen A', 
        land: 'Deutschland',
        countryCode: 'DE',
        branche: 'Technologie',
        co2Verbrauch: 1000,
        id: 1
      }
    ]);
    //return inject(HttpClient).get<Unternehmen[]>('assets/db.json');
    //return this.http.get<Unternehmen[]>('db.json');
  }

}

//https://www.youtube.com/watch?v=-jRxG84AzCI

//https://www.youtube.com/watch?v=NQBWxlQ_m9U