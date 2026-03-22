import { computed, effect, Injectable, signal } from '@angular/core';

export type Einstellungen = {
  isRtl: boolean;
};

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly m_LocalStorageKey = 'settings';
  private readonly currentEinstellungen = signal<Einstellungen>(this.loadSettings());

  isRtl = computed(() => this.currentEinstellungen().isRtl);

  constructor() {
    effect(() => {
      const einstellungen = this.currentEinstellungen();
      sessionStorage.setItem(this.m_LocalStorageKey, JSON.stringify(einstellungen));
    });
  }

  public setRtl(isRtl: boolean): void {
    this.currentEinstellungen.update((einstellungen) => ({ ...einstellungen, isRtl: isRtl }));
  }

  private isRichtungRtlBeiErstenStart(): boolean {
    const lang = (navigator.language || 'en').toLowerCase();
    const rtlLangs = ['ar', 'fa', 'he', 'ur'];
    return rtlLangs.some((code) => lang.startsWith(code));
  }

  private loadSettings(): Einstellungen {
    try {
      const storedSettings = sessionStorage.getItem(this.m_LocalStorageKey);
      return storedSettings ? JSON.parse(storedSettings) : this.getDefaultSettings();
    } catch (error) {
      console.error(error);
    }
    return this.getDefaultSettings();
  }

  private getDefaultSettings(): Einstellungen {
    return { isRtl: this.isRichtungRtlBeiErstenStart()};
  }
}
