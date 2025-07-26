import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { UnternehmenService, Unternehmen } from './service/unternehmen.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <header class="app-header">
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

    <router-outlet (activate)="onActive($event)" />
  `,
  styles: [],
})
export class AppComponent {
  title = 'angular-demo';

  private unternehmenService = inject(UnternehmenService);

  constructor() {
    // Fetch all companies on initialization
    const alleUnternehmen = this.unternehmenService.getAlleUnternehmen();
    alleUnternehmen.forEach((element) => {
      console.log(element);
    });
  }

  onActive(event: any): void {
    // Handle the active route change if needed
    console.log('Active route changed:', event);
  }
}
