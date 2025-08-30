import { Component, inject } from '@angular/core';
import { FooterComponent } from './footer.component';
import { DialogFacade } from '../../components/dialog-facade';
import { createRechtlichesFooterData } from './footer-helper';

@Component({
  selector: 'app-footer-container',
  template: ` <app-footer>
    <div class="d-flex justify-content-center gap-3">
      <button (click)="openRechtliches()" class="btn btn-primary">
        Rechtliche Hinweise
      </button>
      <button (click)="openSettings()" class="btn btn-primary">
        Einstellungen
      </button>
    </div>
  </app-footer>`,
  styles: ``,
  imports: [FooterComponent],
})
export class FooterContainer {
  private readonly m_DialogFacade = inject(DialogFacade);

  openRechtliches(): void {
    const dialogInhalt = createRechtlichesFooterData();
    this.m_DialogFacade.openModalDialogMitHtml(dialogInhalt.titel, dialogInhalt.datacontent);
  }

  openSettings(): void {
    console.log('Settings clicked');
    // this.m_SettingsDialogService
    //   .openSettingsDialog(this.m_SettingsService.Settings.isRightToLeft)
    //   .subscribe((settings) => {
    //     this.handleSettingsChange(settings);
    //   });
  }
}
