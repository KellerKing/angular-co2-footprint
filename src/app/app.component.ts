import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { UnternehmenService, Unternehmen } from './service/unternehmen.service';
import { FooterComponent } from './components/footer/footer.component';
import { DialogRechtlichesComponent } from './components/dialog.rechtliches/dialog.rechtliches.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogSettingsComponent, DialogSettingsInput, DialogSettingsOutput } from './components/dialog.settings/dialog.settings.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <header>
      <app-header
        [headerData]="{
          logoUrl: 'logo_iu.svg',
          headerEntries: [
            { title: 'Home', routerLink: '', sortOrder: 1, isActive: true },
            {
              title: 'Tabelle',
              routerLink: 'tabelle',
              sortOrder: 2,
              isActive: false
            },
            {
              title: 'About',
              routerLink: 'about',
              sortOrder: 3,
              isActive: false
            }
          ]
        }"
      >
      </app-header>
    </header>
    <body>
      <router-outlet (activate)="onActive($event)" />
      <footer class="footer fixed-bottom">
        <app-footer>
          <button (click)="openRechtliches()" class="btn btn-primary">
            Rechtliche Hinweise
          </button>
          <button (click)="openSettings()" class="btn btn-primary">
            Einstellungen
          </button>
        </app-footer>
      </footer>
    </body>
  `,
  styles: [],
})
export class AppComponent {
  title = 'angular-demo';

  private unternehmenService = inject(UnternehmenService);
  readonly m_Dialog = inject(MatDialog);
  constructor() {
    // Fetch all companies on initialization
    const alleUnternehmen = this.unternehmenService.getUnternehmen(2, 10);
    alleUnternehmen.forEach((element) => {
      console.log(element);
    });
  }

  onActive(event: any): void {
    // Handle the active route change if needed
    console.log('Active route changed:', event);
  }

  openRechtliches(): void {
    console.log('Rechtliche Hinweise clicked');
    this.m_Dialog.open(DialogRechtlichesComponent, { disableClose: true });
  }

  openSettings(): void {
    console.log('Settings clicked');
    this.m_Dialog
      .open<
      DialogSettingsComponent,
      DialogSettingsInput,
      DialogSettingsOutput> 
      (DialogSettingsComponent, {
        data: { isRightToLeft: false },
        disableClose: true,
      })
      .afterClosed()
      .subscribe((x) => this.handleSettingsChange(x));
  }

  handleSettingsChange(settings?: DialogSettingsOutput): void {
    if (!settings || settings.isCancelled)
      return;
    // Handle the settings change, e.g., apply RTL layout
    if (settings.isRightToLeft) {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.removeAttribute('dir');
    } 
  }
}
