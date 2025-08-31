import { Component } from '@angular/core';
import { AboutPageComponent } from './about-page-component';

@Component({
  selector: 'app-about-page-container',
  imports: [AboutPageComponent],
  template: `
    <app-about-page-component>
      <p>
        Diese Seite hat keine Funktionalität, sondern dient lediglich als
        Beispiel für das Navigieren über den Header. Nachfolgend der Demtext,
        damit es nicht so leer aussieht ;-)
        <br />
        <br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, rerum
        possimus inventore ratione deleniti ea aut accusantium esse quis quaerat
        dolorem quidem corporis nostrum molestias? Assumenda architecto quidem
        voluptates officiis!
      </p>
    </app-about-page-component>
  `,
  styles: ``,
})
export class AboutPageContainer {}
