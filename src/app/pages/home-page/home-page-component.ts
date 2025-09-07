import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page-component',
  imports: [],
  template: `
    <div class="rounded bg-light-blue container p-3">
      <div class="row">
        <div class="col-sm text-center">
          <h1 class="mt-5">IPWA01-01</h1>
          <br />
          <h2>Programmierung von Webanwendungsoberflächen</h2>
          <br />

          <p class="mt-5 fs-4">
            Die Seite soll für für eine fitive Non-Profit-Organisation sein, um
            einen Überblick darüber zu schaffen, welche Unternehmen bzw. Länder
            wie viel Co2 Jährlich emittieren.
          </p>
        </div>
        <div class="col-sm">
          <img
            src="Regenwald.png"
            class="img-fluid rounded"
            alt="Regenwald"
            width="500"
            height="500"
          />
        </div>
      </div>

      <div class="container" style="margin-top: 5%;">
        <h3 class="pt-3">Tabelle</h3>
        <p>
          Der Schwerpunkt liegt auf dem Menüpunkt "Tabelle". Über ihn gelangt
          man zu einer Tabelle die eine auflistung von fiktiven Unternehmen
          enthält, und wie viel Co2 sie jährlich emittieren. Beim klick auf die
          Kopfzeile der Spalten wird die Tabelle nach der jeweiligen Spalte
          sortiert. Ein Pfeil gibt die Sortierrichtung an. Das Dropwdown Filter
          kann aufgeklappt werden und dann können entpsrechende Filter gesetzt
          werden die logisch verundet werden.
        </p>

        <h3 class="pt-3">Einstellungen</h3>
        <p>
          Ein weiteres Feature der Webseite ist der Button "Einstellen" des
          Footers. Darüber kann die Seite von LTR auf RTL umgestellt werden. Das
          ist besonders für arabische Länder interessant, da dort von rechts
          nach links gelesen wird.
          <br />
          Wichtig ist hier zu berücksichtigen, dass wenn die Seite aufgerufen
          wird und der Browser auf arabisch eingestellt ist, die Seite
          automatisch auf RTL umgestellt wird. Diese Einstellung wird beim
          refresh der Seite beibehalten. Beim schließen des Browsertabs und
          erneutem öffnet setzt sie sich allerings bewusst zurück.
        </p>
      </div>
    </div>
  `,
  styles: ``,
})
export class HomePageComponent {}
