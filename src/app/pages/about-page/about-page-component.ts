import { Component } from '@angular/core';

@Component({
  selector: 'app-about-page-component',
  imports: [],
  template: `
    <div class="container-fluid p-3">
      <ng-content></ng-content>
    </div>
  `,
  styles: ``,
})
export class AboutPageComponent {}
