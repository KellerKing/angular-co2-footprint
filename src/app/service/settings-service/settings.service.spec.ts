import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Einstellungen, SettingsService } from './settings.service';
import { TestBed } from '@angular/core/testing';

describe('SettingsService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    sessionStorage.clear();
  });

  function createService(): SettingsService {
    return TestBed.inject(SettingsService);
  }

  describe('Initialisierung', () => {
    it('isRtl_FALSE_ltr wenn nix gespeichert und ltr Sprache', () => {
      //vi.SpyOn überwacht das navigator Objekt. Genauer gesagt die Eigenschaft "language" und da es ein Getter ist, braucht es das dritte Argumgent "get".  Der Rückgabewert wird dann auf "mockReturnValue" überschieben.
      //Der Service schaut auf den navigator. Darum braucht es das.
      vi.spyOn(navigator, 'language', 'get').mockReturnValue('de');
      const service = createService();
      expect(service.isRtl()).toBe(false);
    });

    describe('Initialisierung', () => {
      it('isRtl_FALSE_ltr wenn nix gespeichert und language Attr. Nothing ist', () => {
        //vi.SpyOn überwacht das navigator Objekt. Genauer gesagt die Eigenschaft "language" und da es ein Getter ist, braucht es das dritte Argumgent "get".  Der Rückgabewert wird dann auf "mockReturnValue" überschieben.
        //Der Service schaut auf den navigator. Darum braucht es das.
        vi.spyOn(navigator, 'language', 'get').mockReturnValue('');
        const service = createService();
        expect(service.isRtl()).toBe(false);
      });

      it('isRtl_TRUE_rtl wenn nix gespeichert und rtl Sprache', () => {
        vi.spyOn(navigator, 'language', 'get').mockReturnValue('ar');
        const service = createService();
        expect(service.isRtl()).toBe(true);
      });

      it('isRtl_TRUE_rtl wenn gespeicherte Einstellungen und rtl Sprache weil letzte Einstellung gewinnt und es nicht vorkommt, dass die Seite aufgerufen wird und danach die Sprache geändert wird.', () => {
        sessionStorage.setItem('settings', JSON.stringify({ isRtl: true }));
        vi.spyOn(navigator, 'language', 'get').mockReturnValue('ar');
        const service = createService();
        expect(service.isRtl()).toBe(true);
      });

      it('isRtl_TRUE_rtl wenn sessionStorage ungültiges JSON enthält und arabische Sprache und reutrn type als ar-ar', () => {
        vi.spyOn(navigator, 'language', 'get').mockReturnValue('aR-Ar');
        sessionStorage.setItem('settings', 'ungültiges json{{{');
        const service = createService();
        expect(service.isRtl()).toBe(true);
      });

      it('isRtl_FALSE_ltr wenn sessionStorage ungültiges JSON enthält und deutsche Sprache und return type als de-de', () => {
        vi.spyOn(navigator, 'language', 'get').mockReturnValue('dE-de');
        sessionStorage.setItem('settings', 'ungültiges json{{{');
        const service = createService();
        expect(service.isRtl()).toBe(false);
      });
    });
  });

  describe('setRtl', () => {
    it('sollte isRtl auf true setzen und sessionStorage aktualisieren', () => {
      const service = createService();
      service.setRtl(true);
      expect(service.isRtl()).toBe(true);

      TestBed.tick();
      const stored = JSON.parse(sessionStorage.getItem('settings')!) as Einstellungen;
      expect(stored.isRtl).toBe(true);
    });

    it('sollte isRtl auf false setzen', () => {
      const service = createService();
      service.setRtl(true);
      expect(service.isRtl()).toBe(true);

      service.setRtl(false);
      expect(service.isRtl()).toBe(false);

      TestBed.tick();
      const stored = JSON.parse(sessionStorage.getItem('settings')!) as Einstellungen;
      expect(stored.isRtl).toBe(false);
    });
  });
});
