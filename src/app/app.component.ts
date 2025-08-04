import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { UnternehmenService, Unternehmen } from './service/unternehmen.service';
import { FooterComponent } from './components/footer/footer.component';

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
        <app-footer></app-footer>
      </footer>
    </body>
  `,
  styles: [],
})
export class AppComponent {
  title = 'angular-demo';

  private unternehmenService = inject(UnternehmenService);

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
}
