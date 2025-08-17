import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <div
      class="navbar bg-body-tertiary navbar-light bg-light navbar-expand-lg border-top mt-auto mb-2"
    >
      <div class="container justify-content-center">
      <ng-content></ng-content>
      
      </div>
</div>
  `,
  styles: ``,
})
export class FooterComponent {}
