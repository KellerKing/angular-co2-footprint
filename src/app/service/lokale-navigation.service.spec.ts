import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LokaleNavigationService } from './lokale-navigation.service';

// Reine Unit-Tests: Service wird isoliert getestet.
// In app.spec.ts  und page-tabelle.spec.ts gibt es bereits Integrationstests, die das Zusammenspiel mit der Komponente testen.
describe('LokaleNavigationService', () => {
  let service: LokaleNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });
    service = TestBed.inject(LokaleNavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('setzt Sichtbarkeit und Elemente mit nutzeNavigation', () => {
    const items = [
      { label: 'Suchfilter', fragment: 'suchfilter' },
      { label: 'Tabelle', fragment: 'tabelle' },
    ];

    service.nutzeNavigation(items);

    expect(service.isVisible()).toBe(true);
    expect(service.darstellbareElemente()).toEqual(items);
  });

  it('setzt Zustand mit deaktivereNavigation zurueck', () => {
    service.nutzeNavigation([{ label: 'Test', fragment: 'test' }]);
    expect(service.isVisible()).toBe(true);
    expect(service.darstellbareElemente().length).toBe(1);

    service.deaktivereNavigation();

    expect(service.isVisible()).toBe(false);
    expect(service.darstellbareElemente()).toEqual([]);
  });
});