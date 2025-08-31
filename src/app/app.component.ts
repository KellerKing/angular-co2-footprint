import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderContainer } from './layout/header/header.container';
import { FooterContainer } from './layout/footer/footer-container';
import { SettingsModel } from './service/settings/settings-mode';
import { SettingsFacade } from './facade/settings-facade';

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
        <app-footer-container
          [m_CurrentSettings]="this.m_SettingsCopy"
          (settingsChanged)="handleSettingsChanged($event)"
        ></app-footer-container>
      </footer>
    </body>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  private readonly m_SettingsFacade = inject(SettingsFacade);
  m_SettingsCopy: SettingsModel = this.m_SettingsFacade.settingsCopy;

  ngOnInit(): void {
    this.m_SettingsFacade.initializeSettings();
  }

  handleSettingsChanged(settings: SettingsModel | null): void {
     // Nachteile dieser Implementierung:
    // - Es wird nicht geprüft, ob die Einstellungen geändert wurden.
    // - Da global die Einstellungen geändert werden, kann jede Komponente nicht unabhängig darauf reagieren.
    //    Beispielsweise könnte der Header in rtl und ltr gleich bleiben und nur der Textfluss der Page wird geändert.
    //    Darum wäre es besser, wenn die Einstellungen ein Observable wären, das die Komponenten abonnieren können und dann einzeln darauf reagieren.
    this.m_SettingsFacade.updateSettings(settings!);
    this.m_SettingsCopy = this.m_SettingsFacade.settingsCopy;
  }
}
