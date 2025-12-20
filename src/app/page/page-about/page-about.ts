import { Component, inject } from '@angular/core';
import { DatabaseService } from '../../service/database-service';

@Component({
  selector: 'app-page-about',
  imports: [],
  template: `
  <div class="container-fluid p-3">
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
    </div>
    `,
  styles: [''],
})
export class PageAbout {
  // m_Service = inject(DatabaseService);
  // constructor() {
  //   this.m_Service.test();
  // }
 
}
