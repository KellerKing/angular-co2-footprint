import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogRectlichesTemplate } from './components/dialog-rechtliches/dialog-rechtliches.component';
import { DialogEinstellungen } from './components/dialog-einstellungen/dialog-einstellungen.component';

@Component({
  selector: 'app-footer-component',
  imports: [],
  templateUrl: './footer.component.html',
  styles: [],
})
export class FooterComponent {
  private readonly m_Dialog = inject(MatDialog);

  openRechtlicheHinweise() {
    this.m_Dialog.open(DialogRectlichesTemplate, {
      disableClose: true,
    });
  }

  openEinstellungen() {
    this.m_Dialog.open(DialogEinstellungen, {
      disableClose: true,
    });
  }
}
