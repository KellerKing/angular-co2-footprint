import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  imports: [],
  template: `
    <div class="rounded bg-light-blue container p-3">
      <div class="row">
        <div class="col-sm">
          <h1>IPWA01-01</h1>
          <h2>Programmierung von Webanwendungsoberflächen</h2>

          <br />
          <p class="">
            Wilkommen zu meiner Lösung der Aufgabenstellung 1: CO2-Footprint.
            <br />
            <br />
            Die Seite soll für für eine fitive Non-Profit-Organisation sein, um
            einen Überblick darüber zu schaffen, welche Unternehmen bzw. Länder
            wie viel Co2 Jährlich emittieren. Das herzsztück der Seite ist der
            Menüpunkt Tabelle. Auf dieser Unterseite können die Unternehmen
            betrachtet werden. Darüberhinaus ist die Tabelle auch Filter- und
            Sortierbar.
            <br />
            <br />
            Die genaue Funktionsweise und deren Features wird unterhalb dieses
            Blocks erklärt
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
    </div>

    <div class="container mt-5">
    <p class="">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde voluptate
      minima, molestias saepe eligendi mollitia vero. Natus labore delectus in,
      fugiat sed, perspiciatis itaque tenetur odit sint veritatis, beatae
      cumque.
    </p>
</div>
  `,
  styles: ``,
})
export class HomePageComponent {}
