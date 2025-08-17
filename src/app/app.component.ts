import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DialogRechtlichesComponent } from './components/dialog.rechtliches/dialog.rechtliches.component';
import { MatDialog } from '@angular/material/dialog';
import {
  DialogSettingsOutput,
} from './components/dialog.settings/dialog.settings.component';
import { SettingsDialogService } from './service/settings/settings.dialog.service';
import { DirectionService } from './service/direction.service';
import { SettingsDataService } from './service/settings/settings.data.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <body class="d-flex flex-column min-vh-100">
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
      <main class="flex-fill mb-2">
        <router-outlet (activate)="onActive($event)" />
      </main>
      <footer>
        <app-footer>
          <div class="d-flex justify-content-center gap-3">
            <button (click)="openRechtliches()" class="btn btn-primary">
              Rechtliche Hinweise
            </button>
            <button (click)="openSettings()" class="btn btn-primary">
              Einstellungen
            </button>
          </div>
        </app-footer>
      </footer>
    </body>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  title = 'angular-demo';

  readonly m_Dialog = inject(MatDialog);
  readonly m_SettingsDialogService = inject(SettingsDialogService);
  readonly m_DirectionService = inject(DirectionService);
  readonly m_SettingsService = inject(SettingsDataService);

  onActive(event: any): void {
    console.log('Active route changed:', event);
  }

  ngOnInit(): void {
    if (this.m_SettingsService.HasSettings) {
      const settings = this.m_SettingsService.Settings;
      this.m_DirectionService.richtungAktuallisieren(settings.isRightToLeft);
      return;
    }

    const isRtl = this.m_DirectionService.isRichtungRtlBeiErstenStart();
    this.m_DirectionService.richtungAktuallisieren(isRtl);
    this.m_SettingsService.updateSettings(isRtl);
  }

  openRechtliches(): void {
    console.log('Rechtliche Hinweise clicked');
    this.m_Dialog.open(DialogRechtlichesComponent, { disableClose: true });
  }

  openSettings(): void {
    console.log('Settings clicked');
    this.m_SettingsDialogService
      .openSettingsDialog(this.m_SettingsService.Settings.isRightToLeft)
      .subscribe((settings) => {
        this.handleSettingsChange(settings);
      });
  }

  handleSettingsChange(settings?: DialogSettingsOutput): void {
    if (!settings || settings.isCancelled) return;
    // Nachteile dieser Implementierung:
    // - Es wird nicht geprüft, ob die Einstellungen geändert wurden.
    // - Da global die Einstellungen geändert werden, kann jede Komponente nicht unabhängig darauf reagieren.
    //    Beispielsweise könnte der Header in rtl und ltr gleich bleiben und nur der Textfluss der Page wird geändert.
    //    Darum wäre es besser, wenn die Einstellungen ein Observable wären, das die Komponenten abonnieren können und dann einzeln darauf reagieren.
    this.m_DirectionService.richtungAktuallisieren(settings.isRightToLeft);
    this.m_SettingsService.updateSettings(settings.isRightToLeft);
  }
}
