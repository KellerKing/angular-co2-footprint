import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page-component',
  imports: [],
  template: `
    <div class="rounded bg-light-blue container p-3">
      <ng-content> </ng-content>
    </div>
  `,
  styles: ``,
})
export class HomePageComponent {}
