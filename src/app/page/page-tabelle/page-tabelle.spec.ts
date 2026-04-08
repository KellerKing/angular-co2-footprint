import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { PageTabelle } from './page-tabelle';
import { CO2Data, DatabaseService } from '../../service/database.service/database.service';
import { LokaleNavigationService } from '../../service/lokale-navigation.service';

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
    const gefilterteDaten = daten.filter(x =>
        x.country.toLowerCase().includes(land.toLowerCase()) &&
        x.company_name.toLowerCase().includes(firma.toLowerCase()),
    );

    return { success: true, data: gefilterteDaten };
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

  it('Smoke Test: Komponente erstellbar', () => {
    expect(component).toBeTruthy();
  });

  it('Integration-Test: Ändern des Suchmodells führt zu einem neuen Service-Aufruf mit den eingaben.', async () => {
    expect(getDataMock).toHaveBeenCalledWith('', '');

    component.sucheModel.set({ land: 'Ger', firma: 'Acme' });

    await fixture.whenStable();

    expect(getDataMock).toHaveBeenLastCalledWith('Ger', 'Acme');
  });

  it('Integration-Test: Suchänderung aktualisiert sichtbare Daten', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.tabelleViewModel().length).toBe(4);

    component.sucheModel.set({ land: 'Ger', firma: '' });
    await fixture.whenStable();

    expect(component.tabelleViewModel().length).toBe(2);
  });

  it("Integration-Test: Ändern der Suche ohne Treffer", async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    component.sucheModel.set({ land: "xyz", firma: "1abc1" });
    await fixture.whenStable();

    expect(component.tabelleViewModel().length).toBe(0);
  });

  //Keine Ahnung ob ich das noch brauche und will.
  // it("Integration-Test: Suchfilter über HTML-Input reduziert die gerenderten Tabellenzeilen", async () => {
  //   vi.useFakeTimers();

  //   try {
  //     fixture.detectChanges();
  //     await fixture.whenStable();

  //     const landInput = fixture.nativeElement.querySelector('#land') as HTMLInputElement;
  //     expect(landInput).toBeTruthy();

  //     landInput.value = 'Ger';
  //     landInput.dispatchEvent(new Event('input', { bubbles: true }));
  //     fixture.detectChanges();

  //     await vi.advanceTimersByTimeAsync(350);
  //     await fixture.whenStable();
  //     fixture.detectChanges();

  //     expect(component.tabelleViewModel().length).toBe(2);

  //     const rows = fixture.nativeElement.querySelectorAll('tr.mat-mdc-row') as NodeListOf<HTMLTableRowElement>;
  //     expect(rows.length).toBe(2);
  //     expect(fixture.nativeElement.textContent).toContain('Germany');
  //   } finally {
  //     vi.useRealTimers();
  //   }
  // });


  it('Integration-Test: Lokale Navigation wird erstmal aufgerufen. Ob diese selbst funktiniert hat mit dem Test nichts zu tun.', async () => {
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
