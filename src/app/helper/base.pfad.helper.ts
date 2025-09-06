import { inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class BasePfadHelper {
  private readonly document = inject(DOCUMENT);

  getVollstaendigenPfad(relativerPfad: string): string {
    const baseHref = this?.document?.baseURI;
    const left = this.getBaseUri(baseHref);
    
    //TODO: Auslagern in private Methode
    if (!relativerPfad) relativerPfad = "";

    let right = relativerPfad.startsWith('/')
      ? relativerPfad.slice(1)
      : relativerPfad;

    right = relativerPfad.startsWith('./')
      ? relativerPfad.slice(2)
      : right;

    const result = `${left}/${right}`;
    
    console.log(result);
    return result; 
  }

  private getBaseUri(base: string): string {
    if (!base) return "";

    const left = base.endsWith('/') ? base.slice(0, -1) : base;
    return left;
  }
}
