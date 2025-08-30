import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {
  DialogSettingsOutput,
} from './components/dialog.settings/dialog.settings.component';
import { SettingsDialogService } from './service/settings/settings.dialog.service';
import { DirectionService } from './service/direction.service';
import { SettingsDataService } from './service/settings/settings.data.service';
import { HeaderContainer } from "./layout/header/header.container";
import { FooterContainer } from "./layout/footer/footer-container";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderContainer, FooterContainer],
  template: `
    <body class="d-flex flex-column min-vh-100">
      <header>
        <app-header-container></app-header-container>
      </header>
      <main class="flex-fill mb-2">
        <router-outlet />
      </main>
      <footer>
        <app-footer-container></app-footer-container>
        <!-- <app-footer>
          <div class="d-flex justify-content-center gap-3">
            <button (click)="openRechtliches()" class="btn btn-primary">
              Rechtliche Hinweise
            </button>
            <button (click)="openSettings()" class="btn btn-primary">
              Einstellungen
            </button>
          </div>
        </app-footer> -->
      </footer>
    </body>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  readonly m_Dialog = inject(MatDialog);
  readonly m_SettingsDialogService = inject(SettingsDialogService);
  readonly m_DirectionService = inject(DirectionService);
  readonly m_SettingsService = inject(SettingsDataService);

  ngOnInit(): void {
    if (this.m_SettingsService.hasSettings) {
      const settings = this.m_SettingsService.settings;
      this.m_DirectionService.richtungAktuallisieren(settings.isRightToLeft);
      return;
    }

    const isRtl = this.m_DirectionService.isRichtungRtlBeiErstenStart();
    this.m_DirectionService.richtungAktuallisieren(isRtl);
    this.m_SettingsService.updateSettings(isRtl);
  }

  openSettings(): void {
    console.log('Settings clicked');
    this.m_SettingsDialogService
      .openSettingsDialog(this.m_SettingsService.settings.isRightToLeft)
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
