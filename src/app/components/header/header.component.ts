import { Component, input, model } from '@angular/core';
import { HeaderDto } from './headerDto';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
    <p>
      {{headerData()?.length}}
    </p>
  `,
  styles: ``
})

export class HeaderComponent {
  headerData = model<HeaderDto[]>();
} //https://angular.dev/guide/components/inputs
//https://v18.angular.dev/guide/signals/model
