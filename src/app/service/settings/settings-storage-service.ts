import { SettingsDto } from './settingsDto';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SettingsStorageService {
  private m_Settings: SettingsDto;
  private readonly m_LocalStorageKey = 'settings';

  constructor() {
    const initialSettings = this.loadSettings();
    this.m_Settings = initialSettings;
  }

  get settings(): SettingsDto {
    return this.m_Settings;
  }

  get hasSettings(): boolean {
    return sessionStorage.getItem(this.m_LocalStorageKey) != null;
  }

  // Falls weitere Einstellungen benötigt werden, kann hier erweitert werden
  updateSettings(isRtl: boolean): void {
    this.m_Settings.isRightToLeft = isRtl;
    sessionStorage.setItem(this.m_LocalStorageKey, JSON.stringify(this.m_Settings));
  }

  private loadSettings(): SettingsDto {
    try {
      const storedSettings = sessionStorage.getItem(this.m_LocalStorageKey);
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
