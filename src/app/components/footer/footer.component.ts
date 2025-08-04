import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <div
      class="navbar bg-body-tertiary navbar-light bg-light navbar-expand-lg ps-3 border-top drop-shadow footer mt-auto"
    >
      <div class="container justify-content-center">
      <button 
       (click)="openRechtliches()"
        class="btn btn-primary"
        >
        Rechtliche Hinweise
      </button>
      </div>
</div>
  `,
  styles: ``,
})
export class FooterComponent {

  readonly dialog = inject(MatDialog);

  openRechtliches(): void {
    console.log('Rechtliche Hinweise clicked');
    const dialog = this.dialog.open(DialogComponent, {});

    dialog.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
    });
  }
}
