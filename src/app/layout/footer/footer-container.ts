import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { FooterComponent } from './footer.component';
import { DialogFacade } from '../../components/dialog-facade';
import { createRechtlichesFooterData } from './footer-helper';
import { SettingsDto } from '../../service/settings/settingsDto';

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
  @Output() settingsChanged = new EventEmitter<SettingsDto | null>();
  m_CurrentSettings = input.required<SettingsDto>();

  private readonly m_DialogFacade = inject(DialogFacade);


  openRechtliches(): void {
    const dialogInhalt = createRechtlichesFooterData();
    this.m_DialogFacade.openModalDialogMitHtml(
      dialogInhalt.titel,
      dialogInhalt.datacontent
    );
  }

  openSettings(): void {
    const settings = this.m_DialogFacade.openSettingsDialog(this.m_CurrentSettings());
    settings.subscribe((result) => {
        this.settingsChanged.emit(result);
    });
  }
}
