import { Component } from '@angular/core';
import { FiltertabelleComponent } from '../../components/filtertabelle/filtertabelle.component';

@Component({
  selector: 'app-tabelle-page',
  imports: [FiltertabelleComponent],
  template: `
    <p>
      tabelle-page works!
    </p>
    <app-filtertabelle></app-filtertabelle>
  `,
  styles: ``
})
export class TabellePageComponent {

}
