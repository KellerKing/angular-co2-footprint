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

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // Integrationstest auf App-Ebene: Router + lazy Pages + gerenderter Inhalt.
  it('navigiert per Header-Link zu About und wieder zurueck zu Home', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);

    fixture.detectChanges();
    await fixture.whenStable();

    const links = Array.from(fixture.nativeElement.querySelectorAll('a')) as HTMLAnchorElement[];
    const aboutLink = links.find((link) => link.textContent?.includes('Über'));
    expect(aboutLink).toBeTruthy();

    aboutLink?.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(router.url).toBe('/about');
    expect(fixture.nativeElement.textContent).toContain('Diese Seite hat keine Funktionalit');

    const homeLink = links.find((link) => link.textContent?.includes('Home'));
    expect(homeLink).toBeTruthy();

    homeLink?.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(router.url).toBe('/');
    expect(fixture.nativeElement.textContent).toContain('IPWA01-01');
  });

  it('Integration: Schaut das lokale Navigation nicht da ist, geht zur Tabellenseite und schaut ob sie da ist und benutzt sie', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);

    fixture.detectChanges();
    await fixture.whenStable();
    
    const header = fixture.nativeElement.querySelector('app-header-component') as HTMLElement;
    const links = Array.from(header.querySelectorAll('a')) as HTMLAnchorElement[];

    expect(router.url).toBe('/');
    //Keine lokale Navigation auf der Startseite
    expect(fixture.nativeElement.querySelector('[aria-label="Navigation öffnen"]')).toBeNull();


    const tabelleLink = links.find((link) => link.textContent?.includes("Über"));
    expect(tabelleLink).toBeTruthy();

    tabelleLink?.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(router.url).toBe('/tabelle');
    const lokaleNavButton = fixture.nativeElement.querySelector('[aria-label="Navigation öffnen"]');
    expect(lokaleNavButton).toBeTruthy();

    lokaleNavButton.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const navItems = Array.from(fixture.nativeElement.querySelectorAll('nav a')) as HTMLAnchorElement[];
  });
});
