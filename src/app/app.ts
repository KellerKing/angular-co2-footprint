import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent, NavItem } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { Title } from '@angular/platform-browser';
import { LokaleNavigation } from './layout/lokale-navigation/lokale-navigation';
import { MatDrawerContainer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, LokaleNavigation, MatDrawerContainer],
  template: `
    <div class="d-flex flex-column min-vh-100">
      <app-header-component [navItems]="this.navItems" [homeItem]="this.homeItem" />

      <div class="flex-grow-1">
        <mat-drawer-container>
          <app-lokale-navigation [isLeftToRight]="true" />

          <router-outlet id="content-bereich" />
        </mat-drawer-container>
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
