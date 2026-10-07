import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LokaleNavigation } from './lokale-navigation.component';
import { LokaleNavigationService } from '../../service/lokale-navigation.service';
import { signal } from '@angular/core';

describe('LokaleNavigation', () => {
  let component: LokaleNavigation;
  let fixture: ComponentFixture<LokaleNavigation>;

  const lokaleNavigationServiceMock = vi.fn(class {
    isVisible = signal(true);
    darstellbareElemente = signal([
      { label: 'Element 1', fragment: 'fragment1' },
      { label: 'Element 2', fragment: 'fragment2' },
    ]);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LokaleNavigation],
      providers: [
        {
          provide: LokaleNavigationService,
          useClass: lokaleNavigationServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LokaleNavigation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('Smoke Test: Komponente erstellbar', () => {
    expect(component).toBeTruthy();
  });

  it('Unit-Test: Button klick öffnet das OffCanvas-Menü. Unit Test mich nur interessiert ob der Klick das Toggle auslöst.', async () => {
    const spyToggle = vi.spyOn(component, 'toggle');

    const buttonOeffnen = fixture.nativeElement.querySelector(
      '[data-testid="lokale-navigation-oeffnen"]',
    ) as HTMLButtonElement;
    buttonOeffnen.click();
    expect(spyToggle).toHaveBeenCalledTimes(1);
  });

  it('Unit-Test: Button klick schließt das OffCanvas-Menü. Unit Test mich nur interessiert ob der Klick das Toggle auslöst.', async () => {
    const spyClose = vi.spyOn(component, 'close');

    const buttonSchliessen = fixture.nativeElement.querySelector(
      '[data-testid="lokale-navigation-schliessen"]',
    ) as HTMLButtonElement;
    buttonSchliessen.click();
    expect(spyClose).toHaveBeenCalledTimes(1);
  });

  it('Integration-Test: Toggle öffnet und schließt das OffCanvas-Menü. Integration weil es auf Bootstrap-Komponenten angewiesen ist', async () => {
    const offCanvasHtmlElement = fixture.nativeElement.querySelector('[data-testid="offcanvas"]') as HTMLElement;
    expect(offCanvasHtmlElement).toBeTruthy();
    expect(offCanvasHtmlElement.classList.contains("show")).toBe(false);

    component.toggle();
    fixture.detectChanges();
    await fixture.whenStable();
    
    expect(offCanvasHtmlElement.classList.contains("showing")).toBe(true);

    offCanvasHtmlElement.addEventListener("shown.bs.offcanvas", function () { 
      expect(offCanvasHtmlElement.classList.contains("show")).toBe(true); 
    });
  });
});
