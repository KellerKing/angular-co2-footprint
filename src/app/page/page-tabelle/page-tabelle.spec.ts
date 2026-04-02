import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { PageTabelle } from './page-tabelle';
import { CO2Data, DatabaseService } from '../../service/database.service/database.service';
import { LokaleNavigationService } from '../../service/lokale-navigation.service';

// Integration-Tests (komponentennah): Zusammenspiel aus Komponente, Service-Mocks und Lifecycle.
describe('PageTabelle', () => {
  let component: PageTabelle;
  let fixture: ComponentFixture<PageTabelle>;
  const daten: CO2Data[] = [
    { id: 1, country: 'Germany', company_name: 'Alpha AG', co2_verbrauch: 150 },
    { id: 2, country: 'Germany', company_name: 'Beta GmbH', co2_verbrauch: 90 },
    { id: 3, country: 'France', company_name: 'Carbon Corp', co2_verbrauch: 200 },
    { id: 4, country: 'USA', company_name: 'Delta Inc', co2_verbrauch: 40 },
  ];

  const getDataMock = vi.fn(async (land: string, firma: string) => {
    const landNormalized = land.toLowerCase();
    const firmaNormalized = firma.toLowerCase();

    return daten.filter(
      (item) =>
        item.country.toLowerCase().includes(landNormalized) &&
        item.company_name.toLowerCase().includes(firmaNormalized),
    );
  });
  const nutzeNavigationMock = vi.fn();

  beforeEach(async () => {
    getDataMock.mockClear();
    nutzeNavigationMock.mockClear();

    await TestBed.configureTestingModule({
      imports: [PageTabelle],
      providers: [
        {
          provide: DatabaseService,
          useValue: {
            getData: getDataMock,
          },
        },
        {
          provide: LokaleNavigationService,
          useValue: {
            nutzeNavigation: nutzeNavigationMock,
            deaktivereNavigation: () => {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PageTabelle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  // Smoke-Test: Nur Erstellung um sicherzustellen, dass die Komponente grundsätzlich funktioniert.
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Integration: Ändern des Suchmodells führt zu einem neuen Service-Aufruf mit den eingaben.', async () => {
    expect(getDataMock).toHaveBeenCalledWith('', '');

    component.sucheModel.set({ land: 'Ger', firma: 'Acme' });

    await fixture.whenStable();

    expect(getDataMock).toHaveBeenLastCalledWith('Ger', 'Acme');
  });

  it('Integration: Suchaenderung aktualisiert sichtbare Daten', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.tabelleViewModel().length).toBe(4);

    component.sucheModel.set({ land: 'Ger', firma: '' });
    await fixture.whenStable();

    expect(component.tabelleViewModel().length).toBe(2);
  });


  it('Integration: Lokale Navigation wird erstmal aufgerufen. Ob diese selbst funktiniert hat mit dem Test nichts zu tun.', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    expect(nutzeNavigationMock).toHaveBeenCalledWith([
      { label: 'Suchfilter', fragment: 'suchfilter' },
      { label: 'Tabelle', fragment: 'tabelle' },
      { label: 'Zusätzliche Informationen', fragment: 'zusaetzliche-informationen' },
      { label: 'Zum Footer', fragment: 'ende' },
    ]);
  });
});
