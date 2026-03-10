import {
  Component,
  computed,
  effect,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LokaleNavigationService } from './lokale-navigation.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-lokale-navigation',
  imports: [RouterModule, MatDrawer],
  templateUrl: './lokale-navigation.html',
  styleUrl: './lokale-navigation.css',
})
export class LokaleNavigation  {

  readonly m_NavigationService = inject(LokaleNavigationService); 
  readonly sidenav = viewChild<MatDrawer>('drawer');


  navigationItems1 = computed(() => {
    return this.m_NavigationService.darstellbareElemente().map(item => ({ label: item.label, fragment: item.fragment }));
  });

  //Später mit Service, damit die Navigation dynamisch ist
  isLeftToRight = input.required<boolean>();
  //navigationItems = input.required<LokaleNavigationInputItem[]>();

  /* Es ist theoretisch keine navigation mit Fragment-Id weil ich nicht über #Fragment gehe, aber so gefällt es mir besser weil einfacher und ich nicht das Problem habe, was passiert wenn ich beim 
  Fragment bin und es nochmal anklike, dann würde nix passieren auch wenn bereits weiter gescrollt. Alternativ Bootstrap Scrollspy aber da wollte klare Trennung zwischen den Komponente. */
  // navigereZuFragment(fragmentId: string) {
  //   if (fragmentId) document.getElementById(fragmentId)?.scrollIntoView({ behavior: 'smooth' });
  // }

  constructor() {
    effect(() => {
      console.log("Toggle")
      this.sidenav()?.toggle(this.m_NavigationService.isOpen())
    });
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
🎯 Wie du Bootstrap Offcanvas sauber in Angular nutzt
Hier ist die minimalistische, saubere Variante, die perfekt zu deinem modularen Stil passt:

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
*/