import { computed, Injectable, signal } from '@angular/core';

type Einstellungen = {
  isRlt: boolean;
};

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly ltr = 'ltr';
  private readonly rtl = 'rtl';

  private readonly currentEinstellungen = signal<Einstellungen>({
    isRlt: this.isRichtungRtlBeiErstenStart(),
  });

  isRtl = computed(() => this.currentEinstellungen().isRlt);


  setRlt(isRlt: boolean): void {
    this.currentEinstellungen.update((einstellungen) => ({ ...einstellungen, isRlt: isRlt }));
  }

  isRichtungRtlBeiErstenStart(): boolean {
    const lang = (navigator.language || 'en').toLowerCase();
    const rtlLangs = ['ar', 'fa', 'he', 'ur'];
    return rtlLangs.some((code) => lang.startsWith(code));
  }
}
