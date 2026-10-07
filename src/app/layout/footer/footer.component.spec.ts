import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { vi } from 'vitest';

import { FooterComponent } from './footer.component';
import { DialogRectlichesTemplate } from './components/dialog-rechtliches/dialog-rechtliches.component';
import { DialogEinstellungen } from './components/dialog-einstellungen/dialog-einstellungen.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let dialogMock: { open: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    dialogMock = {
      open: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [{ provide: MatDialog, useValue: dialogMock }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('Smoke Test: Komponente erstellbar', () => {
    expect(component).toBeTruthy();
  });

  it('Unit-Test: Button Klick auf Rechtliche Hinweise ruft openRechtlicheHinweise im Typescript auf', async () => {
    const spy = vi.spyOn(component, 'openRechtlicheHinweise');
    const button = fixture.nativeElement.querySelector('[data-testid="footer-button-rechtliche-hinweise"]') as HTMLButtonElement;

    button.click();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Unit-Test: Button Klick auf Einstellungen ruft openEinstellungen im Typescript auf', async () => {
    const spy = vi.spyOn(component, 'openEinstellungen');
    const button = fixture.nativeElement.querySelector('[data-testid="footer-button-einstellungen"]') as HTMLButtonElement;

    button.click();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Unit-Test: openRechtlicheHinweise und openEinstellungen im Typescript rufen die Dialoge auf ohne deren Funktionalität zu testen', async () => {
    component.openRechtlicheHinweise();
    component.openEinstellungen();

    //DialogMock wurde definiert weil mein Dialog von einem MatDialog aufgerufen wird. Darum der Mock um nicht abhänig von Angular Material zu sein.
    //Der Mock macht nämlich gar nix. Ich will nur wissen ob er mit den richtigen Parametern aufgerufen wird. Darum: toHaveBeenCalledWith.
    expect(dialogMock.open).toHaveBeenCalledWith(DialogRectlichesTemplate, { disableClose: true });
    expect(dialogMock.open).toHaveBeenCalledWith(DialogEinstellungen, { disableClose: true });
  });
});
