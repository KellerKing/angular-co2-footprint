import { inject, Injectable } from '@angular/core';
import { BasePfadHelper } from '../helper/base.pfad.helper';
import { UnternehmenService } from '../service/unternehmen/unternehmen.service';
import { lastValueFrom, Observable, Subject, take } from 'rxjs';
import { UnternehmenModel } from '../service/unternehmen/unternehmen.model';

@Injectable({ providedIn: 'root' })
export class UnternehmenFacade {
  private readonly m_BasePfadHelper = inject(BasePfadHelper);
  private readonly m_UnternehmenService: UnternehmenService;
  //Weil ich von der json immer nur alle laden kann. Mit einer richtigen API wuerde ich hier keinen Cache machen
  private m_UnternehmenCached: Observable<UnternehmenModel[]>;

  constructor() {
    const pfad = this.m_BasePfadHelper.getVollstaendigenPfad('./db.json');
    this.m_UnternehmenService = new UnternehmenService(pfad);

    this.m_UnternehmenCached = this.m_UnternehmenService.getAlleUnternehmen();
  }

  getAlleUnternehmen(): Observable<UnternehmenModel[]> {
    return this.m_UnternehmenCached;
  }

  getAnzahlUnternehmen(): Observable<number> {
    const subject = new Subject<number>();
    this.m_UnternehmenCached.pipe(take(1)).subscribe((unternehmen) => {
      subject.next(unternehmen.length);
      subject.complete();
    });

    return subject.asObservable();
  }
}