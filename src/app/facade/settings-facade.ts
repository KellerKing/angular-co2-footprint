import { inject, Injectable } from '@angular/core';
import { SettingsStorageService } from '../service/settings/settings-storage-service';
import { SettingsModel } from '../service/settings/settings-mode';
import { SettingsApplyService } from '../service/settings/settings-apply-service';

@Injectable({ providedIn: 'root' })
export class SettingsFacade {
  private readonly m_StorageService = inject(SettingsStorageService);
  private readonly m_ApplyService = inject(SettingsApplyService);

  get settingsCopy(): SettingsModel {
    const result = this.m_StorageService.settings;
    return { ...result };
  }

  updateSettings(settings: SettingsModel) : void {
    if (!settings) return;
    
    this.m_StorageService.updateSettings(settings.isRightToLeft);
    this.m_ApplyService.richtungAktuallisieren(settings.isRightToLeft);
  }

  initializeSettings(): void {
    if (this.m_StorageService.hasSettings) {
      const settings = this.m_StorageService.settings;
      this.m_ApplyService.richtungAktuallisieren(settings.isRightToLeft);
      return;
    }

    const isRtl = this.m_ApplyService.isRichtungRtlBeiErstenStart();
    this.m_ApplyService.richtungAktuallisieren(isRtl);
    this.m_StorageService.updateSettings(isRtl);
  }
}
