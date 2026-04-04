import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter, Router } from '@angular/router';
import { routes } from './app.routes';
import { describe, it, expect, beforeEach } from 'vitest';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('Smoke Test: Komponente erstellbar', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


  it('Integration-Test: navigiert per Header-Link zu About und wieder zurueck zu Home', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);

    fixture.detectChanges();
    await fixture.whenStable();

    const links = Array.from(fixture.nativeElement.querySelectorAll('a')) as HTMLAnchorElement[];

    //Auf Über im Header klicken
    const aboutLink = links.find((link) => link.textContent?.includes('Über'));
    expect(aboutLink).toBeTruthy();
    aboutLink?.click();
    
    fixture.detectChanges();
    await fixture.whenStable();

    expect(router.url).toBe('/about');
    expect(fixture.nativeElement.textContent).toContain('Diese Seite hat keine Funktionalit');

    //Zurück zu "Home" navgieren
    const homeLink = links.find((link) => link.textContent?.includes('Home'));
    expect(homeLink).toBeTruthy();
    homeLink?.click();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(router.url).toBe('/');
    expect(fixture.nativeElement.textContent).toContain('IPWA01-01');
  });

  it('Integration-Test: Schaut das lokale Navigation nicht da ist, geht zur Tabellenseite und schaut ob sie da ist und benutzt sie', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);

    fixture.detectChanges();
    await fixture.whenStable();
    
    const header = fixture.nativeElement.querySelector('app-header-component') as HTMLElement;
    const links = Array.from(header.querySelectorAll('a')) as HTMLAnchorElement[];

    //Schauen das lokale Navigation nicht da ist auf der Startseite
    expect(router.url).toBe('/');
    expect(fixture.nativeElement.querySelector('[aria-label="Navigation öffnen"]')).toBeNull();

    //Auf Tabelle im Header klicken
    const tabelleLink = links.find((link) => link.textContent?.includes("Tabelle"));
    expect(tabelleLink).toBeTruthy();
    tabelleLink?.click();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(router.url).toBe('/tabelle');
    
    //Schauen das lokale Navigation da ist auf der Tabellenseite da ist und offcanvas öffnen.
    const lokaleNavButton = fixture.nativeElement.querySelector('[aria-label="Navigation öffnen"]');
    expect(lokaleNavButton).toBeTruthy();

    lokaleNavButton.click();
    fixture.detectChanges();
    await fixture.whenStable();

    //Schauen, dass das Offcanvas Einträge hat. Welche es Sind ist mir egal, da ich nur schauen will, dass es da ist und funktioniert.
    const navItems = Array.from(fixture.nativeElement.querySelectorAll('nav a')) as HTMLAnchorElement[];
    expect(navItems.length).greaterThan(0);
  });
});
