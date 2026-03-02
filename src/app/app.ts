import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent, NavItem } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header-component [navItems]="this.navItems" [homeItem]="this.homeItem" />
    <div id="content-bereich">
      <router-outlet />
    </div>
    <app-footer-component />
  `,
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angular-co2-footprint');

  readonly navItems: NavItem[] = [
    { label: 'Home', link: '' },
    { label: 'Tabelle', link: 'tabelle' },
    { label: 'Über', link: 'about' },
  ];

  readonly homeItem = {
    homeLink: '',
    logoUrl: 'logo_iu.svg',
  };
}
