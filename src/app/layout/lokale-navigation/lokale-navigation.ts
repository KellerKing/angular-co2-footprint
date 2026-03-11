import {
  AfterViewInit,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LokaleNavigationService } from './lokale-navigation.service';
import { Offcanvas } from 'bootstrap';

@Component({
  selector: 'app-lokale-navigation',
  imports: [RouterModule],
  templateUrl: './lokale-navigation.html',
  styleUrl: './lokale-navigation.css',
})
export class LokaleNavigation {
  readonly m_NavigationService = inject(LokaleNavigationService);
  private readonly m_Offcanvas = viewChild<ElementRef<Offcanvas>>('offcanvas');

  navigationItems1 = computed(() => {
    return this.m_NavigationService
      .darstellbareElemente()
      .map((item) => ({ label: item.label, fragment: item.fragment }));
  });

  //Später mit Service, damit die Navigation dynamisch ist
  isLeftToRight = input.required<boolean>();
  //navigationItems = input.required<LokaleNavigationInputItem[]>();

  /* Es ist theoretisch keine navigation mit Fragment-Id weil ich nicht über #Fragment gehe, aber so gefällt es mir besser weil einfacher und ich nicht das Problem habe, was passiert wenn ich beim 
  Fragment bin und es nochmal anklike, dann würde nix passieren auch wenn bereits weiter gescrollt. Alternativ Bootstrap Scrollspy aber da wollte klare Trennung zwischen den Komponente. */
  // navigereZuFragment(fragmentId: string) {
  //   if (fragmentId) document.getElementById(fragmentId)?.scrollIntoView({ behavior: 'smooth' });
  // }

  // constructor() {
  //   // effect(() => {
  //   //   console.log("Toggle")
  //   //   this.sidenav()?.toggle(this.m_NavigationService.isOpen())
  //   // });
  // }

  open() {
    this.m_Offcanvas()?.nativeElement.show();
  }

  close() {
    this.m_Offcanvas()?.nativeElement.hide();
  }

  toggle() {
    this.m_Offcanvas()?.nativeElement.toggle();
  }

  navigereZuFragment(fragmentId: string) {
    if (fragmentId) document.getElementById(fragmentId)?.scrollIntoView({ behavior: 'smooth' });
    this.m_NavigationService.isOpen.set(false);
  }
}

// export class LokaleNavigation {

//   navigationItems = input.required<LokaleNavigationInputItem[]>();

//   private readonly m_ActivatedRoute = inject(ActivatedRoute);

//   constructor() {
//   this.m_ActivatedRoute.fragment.subscribe((fragment: string | null) => {
//       if (fragment) this.navigereZuFragment(fragment);
//     });
//   }

//   navigereZuFragment(fragmentId: string | null) {
//     if (fragmentId) document.getElementById(fragmentId)?.scrollIntoView({ behavior: 'smooth' });
//   }
// }

interface LokaleNavigationInputItem {
  label: string;
  fragment: string;
}

/*
1. Offcanvas-Komponente
html
<!-- offcanvas.component.html -->
<div class="offcanvas offcanvas-start" tabindex="-1" #offcanvas>
  <div class="offcanvas-header">
    <h5 class="offcanvas-title">Menü</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
  </div>

  <div class="offcanvas-body">
    <ng-content></ng-content>
  </div>
</div>
ts
// offcanvas.component.ts
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Offcanvas } from 'bootstrap';

@Component({
  selector: 'app-offcanvas',
  standalone: true,
  templateUrl: './offcanvas.component.html'
})
export class OffcanvasComponent {
  @ViewChild('offcanvas') offcanvasEl!: ElementRef;
  private instance!: Offcanvas;

  ngAfterViewInit() {
    this.instance = new Offcanvas(this.offcanvasEl.nativeElement);
  }

  open() {
    this.instance.show();
  }

  close() {
    this.instance.hide();
  }

  toggle() {
    this.instance.toggle();
  }
}
2. Verwendung im Layout
html
<app-offcanvas #menu>
  <a routerLink="/home" class="nav-link">Home</a>
  <a routerLink="/settings" class="nav-link">Settings</a>
</app-offcanvas>

<button class="btn btn-primary" (click)="menu.toggle()">Menü</button>

<router-outlet />
🧩 Warum das gut zu deinem Stil passt
Du arbeitest modular, sauber, mit klaren Komponenten. Bootstrap Offcanvas:

ist komplett kapselbar

braucht keine Angular-spezifischen Layout-Container

ist leicht RTL-kompatibel (einfach offcanvas-end)

ist visuell stabiler als Material Drawer

ist einfacher zu stylen (Tailwind, Custom CSS, alles geht)

Und du bekommst genau das Verhalten, das du willst – ohne Kompromisse.

Wenn du willst, baue ich dir:

eine RTL/LTR-automatische Version

eine responsive Variante (Desktop = Sidenav, Mobile = Offcanvas)

oder eine komplett modulare Navigation, die du überall einstecken kannst

Sag einfach Bescheid, wohin du das entwickeln willst.

Der Close Buttin hat keinen Text
Ah, alles klar — das ist ein klassischer Bootstrap‑Offcanvas‑Stolperstein.
Der Close‑Button hat absichtlich keinen Text, weil Bootstrap ihn als rein ikonischen Button designed hat. Der sichtbare „Text“ ist das SVG‑Icon, das über CSS eingeblendet wird.

Wenn du also gar nichts siehst, liegt es fast immer an einem dieser drei Punkte:

🎯 1. Bootstrap Icons fehlen
Bootstrap Offcanvas nutzt kein eigenes Icon, sondern erwartet entweder:

Bootstrap Icons (separat zu installieren)
oder

dass du das Icon selbst ersetzt

Wenn du Bootstrap Icons nicht eingebunden hast, ist der Button leer.

Lösung
Entweder Bootstrap Icons installieren:

bash
npm install bootstrap-icons
und in styles.css:

css
@import "bootstrap-icons/font/bootstrap-icons.css";
Dann ersetzt du den Close‑Button durch:

html
<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
Bootstrap zeigt dann das Icon korrekt an.

🎯 2. Du nutzt Tailwind → Bootstrap Close‑Icon wird überschrieben
Tailwind setzt background-image: none auf Buttons.
Damit verschwindet das eingebaute SVG‑Icon.

Lösung
Füge das wieder hinzu:

css
.btn-close {
  background-image: var(--bs-btn-close-bg);
}
Oder minimal:

css
.btn-close {
  background-image: url("data:image/svg+xml,...");
}
🎯 3. Du willst lieber einen sichtbaren Text
Dann kannst du den Button einfach selbst definieren:

html
<button type="button" class="btn btn-outline-secondary" data-bs-dismiss="offcanvas">
  Schließen
</button>
Oder mit Icon + Text:

html
<button type="button" class="btn btn-outline-secondary d-flex align-items-center gap-2" data-bs-dismiss="offcanvas">
  <i class="bi bi-x-lg"></i>
  Schließen
</button>
*/
