import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { routes } from '../app.routes';
import { describe, it, expect, beforeEach } from 'vitest';

import { LokaleNavigationService } from './lokale-navigation.service';

// Reine Unit-Tests: Service wird isoliert getestet.
// In app.spec.ts  und page-tabelle.spec.ts gibt es bereits Integrationstests, die das Zusammenspiel mit der Komponente testen.
describe("LokaleNavigationService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });
  });

  it("Smoke Test: Komponente erstellbar", () => {
    const service = TestBed.inject(LokaleNavigationService);
    expect(service).toBeTruthy();
  });

  it("Unit-Test: setzt Sichtbarkeit und Elemente mit nutzeNavigation", () => {
    const service = TestBed.inject(LokaleNavigationService);

    const items = [
      { label: "Suchfilter", fragment: "suchfilter" },
      { label: "Tabelle", fragment: "tabelle" },
    ];

    service.nutzeNavigation(items);

    expect(service.isVisible()).toBe(true);
    expect(service.darstellbareElemente()).toEqual(items);
  });

  it("Unit-Test: setzt Zustand mit deaktivereNavigation zurueck", () => {
    const service = TestBed.inject(LokaleNavigationService);

    service.nutzeNavigation([{ label: "Test", fragment: "test" }]);
    expect(service.isVisible()).toBe(true);
    expect(service.darstellbareElemente().length).toBe(1);

    service.deaktivereNavigation();

    expect(service.isVisible()).toBe(false);
    expect(service.darstellbareElemente()).toEqual([]);
  });
});