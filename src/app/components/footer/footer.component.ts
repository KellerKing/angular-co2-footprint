import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <div
      class="navbar bg-body-tertiary navbar-light bg-light navbar-expand-lg ps-3 border-top mt-auto"
    >
      <div class="container justify-content-center">
      <ng-content></ng-content>
      
      </div>
</div>
  `,
  styles: ``,
})
export class FooterComponent {}
