import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogRectlichesTemplate } from './components/dialog-rectliches-template/dialog-rectliches-template';
import { DialogEinstellungen } from './dialog-einstellungen/dialog-einstellungen';

@Component({
  selector: 'app-footer-component',
  imports: [],
  template: `
    <div class="navbar bg-body-tertiary navbar-light bg-light border-top mt-auto">
      <div class="container justify-content-center mt-2">
        <div class="w-100 row">
          <div class="col-sm">
            <button class="btn btn-primary w-100" (click)="openRechtlicheHinweise()">
              Rechtliche Hinweise
            </button>
          </div>

          <div class="w-100 mb-2 d-block d-md-none"></div>

          <div class="col-sm">
            <button class="btn btn-primary w-100"(click)="openEinstellungen()" >Einstellungen</button>
          </div>
        </div>
        <div class="mt-3 row">
          <p>&copy; 2026 IPWA01-01 - Programmierung von Webanwendungsoberflächen</p>
        </div>
      </div>
    </div>
  `,
  styleUrl: './footer.component.css',
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
