import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { PageTabelle } from './page-tabelle';
import { DatabaseService } from '../../service/database.service/database.service';
import { LokaleNavigationService } from '../../service/lokale-navigation.service/lokale-navigation.service';

/**
 * Integration Tests für PageTabelle
 * 
 * Unterschied zu Unit Tests:
 * - Unit Tests: Eine Component isoliert testen
 * - Integration Tests: Component + ihre Services zusammen testen
 * 
 * Zeigt: Wie Component auf Service-Responses reagiert und Error Handling
 */
describe('PageTabelle (Integration Tests)', () => {
  let component: PageTabelle;
  let fixture: ComponentFixture<PageTabelle>;
  let databaseService: DatabaseService;
  let navigationService: LokaleNavigationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageTabelle],
      providers: [
        DatabaseService,
        LokaleNavigationService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PageTabelle);
    component = fixture.componentInstance;
    databaseService = TestBed.inject(DatabaseService);
    navigationService = TestBed.inject(LokaleNavigationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Integration Test: Component initialisiert mit Navigation Service
   */
  describe('ngOnInit Integration', () => {
    it('registriert Navigation Items beim NavigationService', () => {
      const spy = vi.spyOn(navigationService, 'nutzeNavigation');
      
      component.ngOnInit();
      
      expect(spy).toHaveBeenCalledWith([
        { label: 'Suchfilter', fragment: 'suchfilter' },
        { label: 'Tabelle', fragment: 'tabelle' },
        { label: 'Zusätzliche Informationen', fragment: 'zusaetzliche-informationen' },
        { label: 'Zum Footer', fragment: 'ende' },
      ]);
    });
  });

  /**
   * Integration Test: Component ruft DatabaseService auf
   */
  describe('Daten laden via DatabaseService (Integration)', () => {
    it('lädt Daten beim Initialisieren der Component', async () => {
      const mockData = [
        { id: 1, country: 'Germany', company_name: 'Company A', co2_verbrauch: 100 },
        { id: 2, country: 'France', company_name: 'Company B', co2_verbrauch: 150 }
      ];
      
      vi.spyOn(databaseService, 'getData').mockResolvedValue(
        { success: true as const, data: mockData }
      );

      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.tabelleDataModel()).toEqual(mockData);
      expect(component.fehlerMeldung()).toBeNull();
      expect(component.istLaedend()).toBe(false);
    });

    it('zeigt Fehler an wenn DatabaseService Error zurückgibt', async () => {
      const mockError = {
        type: 'network' as const,
        message: 'Netzwerkfehler. Überprüfen Sie Ihre Internetverbindung.'
      };

      vi.spyOn(databaseService, 'getData').mockResolvedValue(
        { success: false as const, error: mockError }
      );

      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.tabelleDataModel()).toEqual([]);
      expect(component.fehlerMeldung()).toBe(mockError.message);
      expect(component.istLaedend()).toBe(false);
    });
  });

  /**
   * Unit Test: ViewModel Transformation
   * (Nicht typischerweise "Integration", aber zeigt Data Binding)
   */
  describe('tabelleViewModel (Data Transformation)', () => {
    it('transformiert RawData in ViewModel Format', () => {
      const mockData = [
        { id: 1, country: 'Germany', company_name: 'Company A', co2_verbrauch: 100 },
      ];
      component.tabelleDataModel.set(mockData);

      expect(component.tabelleViewModel()).toEqual([
        { id: 1, land: 'Germany', firma: 'Company A', emissionen: 100 }
      ]);
    });

    it('handled fehlende co2_verbrauch mit -1', () => {
      const mockData = [
        { id: 1, country: 'Germany', company_name: 'Company A', co2_verbrauch: null as any },
      ];
      component.tabelleDataModel.set(mockData);

      expect(component.tabelleViewModel()[0].emissionen).toBe(-1);
    });
  });
});



