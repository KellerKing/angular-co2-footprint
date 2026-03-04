import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent, NavItem } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
  <div class="d-flex flex-column min-vh-100">
    <app-header-component [navItems]="this.navItems" [homeItem]="this.homeItem" />
    <div id="content-bereich" class="flex-grow-1">
      <router-outlet />
    </div>
    <app-footer-component />
  </div>
  `,
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Super coole Co2 App');
  private readonly titleService: Title = inject(Title);

  readonly navItems: NavItem[] = [
    { label: 'Home', link: '' },
    { label: 'Tabelle', link: 'tabelle' },
    { label: 'Über', link: 'about' },
  ];

  readonly homeItem = {
    homeLink: '',
    logoUrl: 'logo_iu.svg',
  };

  
  constructor() {
    this.titleService.setTitle(this.title());
  }
}
