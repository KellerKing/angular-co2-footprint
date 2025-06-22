import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  template: `
  <header class="app-header">
        <app-header
      [headerData]="{
        headerEntries: [
          { title: 'Home', routerLink: '', sortOrder: 1, isActive: true },
          { title: 'About', routerLink: 'about', sortOrder: 2, isActive: false }
        ]
      }"
    >
    </app-header>

  </header>
  
    <router-outlet (activate)="onActive($event)"/>
  `,
  styles: [],
})
export class AppComponent {
  title = 'angular-demo';
    

  onActive(event: any): void {
    // Handle the active route change if needed
    console.log('Active route changed:', event);
  }
}
