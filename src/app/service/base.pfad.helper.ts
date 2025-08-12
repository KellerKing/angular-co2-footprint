import { inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class BasePfadHelper {
  private readonly document = inject(DOCUMENT);

  getVollstaendigenPfad(relativerPfad: string): string {
    const baseHref = this.document.baseURI;
    const left = baseHref.endsWith('/') ? baseHref.slice(0, -1) : baseHref;
    const right = relativerPfad.startsWith('/')
      ? relativerPfad.slice(1)
      : relativerPfad;

    const result = `${left}/${right}`;
    
    console.log(result);
    return result; 
  }
}
