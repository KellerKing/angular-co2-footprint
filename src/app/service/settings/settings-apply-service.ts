import { Inject, Injectable } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class SettingsApplyService {
  constructor(
    private dir: Directionality,
    @Inject(DOCUMENT) private document: Document
  ) {}

  richtungAktuallisieren(isRightToLeft: boolean): void {
    const dirValue = isRightToLeft ? 'rtl' : 'ltr';
    this.document.documentElement.setAttribute('dir', dirValue);
    this.dir.change.next(dirValue);
  }

  isRichtungRtlBeiErstenStart(): boolean {
    const lang = navigator.language || 'en';
    const rtlLangs = ['ar', 'fa', 'he', 'ur'];
   return rtlLangs.some(code => lang.startsWith(code));
  }
}
