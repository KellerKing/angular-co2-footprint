import { SettingsDto } from './settingsDto';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SettingsDataService {
  private settings: SettingsDto;
  private readonly localStorageKey = 'settings';

  constructor() {
    const initialSettings = this.loadSettings();
    this.settings = initialSettings;
  }

  get settings(): SettingsDto {
    return this.settings;
  }

  get hasSettings(): boolean {
    return sessionStorage.getItem(this.localStorageKey) != null;
  }

  // Falls weitere Einstellungen benötigt werden, kann hier erweitert werden
  updateSettings(isRtl: boolean): void {
    this.settings.isRightToLeft = isRtl;
    sessionStorage.setItem(this.localStorageKey, JSON.stringify(this.settings));
  }

  private loadSettings(): SettingsDto {
    try {
      console.log('Loading settings from sessionStorage');
      const storedSettings = sessionStorage.getItem(this.localStorageKey);
      return storedSettings
        ? JSON.parse(storedSettings)
        : this.getDefaultSettings();
    } catch (error) {
      console.error('Error loading settings from sessionStorage:', error);
    }
    return this.getDefaultSettings();
  }

  private getDefaultSettings(): SettingsDto {
    return {
      isRightToLeft: false,
    };
  }
}
