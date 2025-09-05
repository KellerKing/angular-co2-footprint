import { Component } from '@angular/core';
import { HomePageComponent } from './home-page-component';

@Component({
  selector: 'app-home-page-container',
  imports: [HomePageComponent],
  template: `
    <app-home-page-component/>
  `,
  styles: ``,
})
export class HomePageContainer {}
