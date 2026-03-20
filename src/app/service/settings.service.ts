import { computed, Injectable, signal } from '@angular/core';

type Einstellungen = {
  isRtl: boolean;
};

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly currentEinstellungen = signal<Einstellungen>({
    isRtl: this.isRichtungRtlBeiErstenStart(),
  });

  isRtl = computed(() => this.currentEinstellungen().isRtl);


  setRtl(isRtl: boolean): void {
    this.currentEinstellungen.update((einstellungen) => ({ ...einstellungen, isRtl: isRtl }));
  }

  isRichtungRtlBeiErstenStart(): boolean {
    const lang = (navigator.language || 'en').toLowerCase();
    const rtlLangs = ['ar', 'fa', 'he', 'ur'];
    return rtlLangs.some((code) => lang.startsWith(code));
  }
}
