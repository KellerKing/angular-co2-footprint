import { Component } from '@angular/core';
import { AboutPageComponent } from './about-page-component';

@Component({
  selector: 'app-about-page-container',
  imports: [AboutPageComponent],
  template: `
    <app-about-page-component/>
  `,
  styles: ``,
})
export class AboutPageContainer {}
