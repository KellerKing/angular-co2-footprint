import {
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LokaleNavigationService } from './lokale-navigation.service';

@Component({
  selector: 'app-lokale-navigation',
  imports: [RouterModule],
  templateUrl: './lokale-navigation.html',
  styleUrl: './lokale-navigation.css',
})
export class LokaleNavigation  {

  private readonly m_NavigationService = inject(LokaleNavigationService); 


  navigationItems1 = computed(() => {
    return this.m_NavigationService.darstellbareElemente().map(item => ({ label: item.label, fragment: item.fragment }));
  });

  //Später mit Service, damit die Navigation dynamisch ist
  isLeftToRight = input.required<boolean>();
  navigationItems = input.required<LokaleNavigationInputItem[]>();

  /* Es ist theoretisch keine navigation mit Fragment-Id weil ich nicht über #Fragment gehe, aber so gefällt es mir besser weil einfacher und ich nicht das Problem habe, was passiert wenn ich beim 
  Fragment bin und es nochmal anklike, dann würde nix passieren auch wenn bereits weiter gescrollt. Alternativ Bootstrap Scrollspy aber da wollte klare Trennung zwischen den Komponente. */
  navigereZuFragment(fragmentId: string) {
    if (fragmentId) document.getElementById(fragmentId)?.scrollIntoView({ behavior: 'smooth' });
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
Wie erreiche ich es, dass nicht jede Seite den Sidenav anzeigen will und die Elemente per Singal übertragen werden
Du willst also:

Nicht jede Seite soll die Sidenav anzeigen

Die Elemente (Menüpunkte) sollen per Signal an die Sidenav übergeben werden

Angular 21 + Standalone + Signals

Saubere, modulare Architektur

Perfekt – das lässt sich richtig elegant lösen, und zwar mit einem globalen Layout + einem SidenavService mit Signals.

Ich zeige dir die beste Architektur, die in Angular 21 idiomatisch ist.

🧱 Architektur, die du willst (und die in Angular 21 perfekt funktioniert)
✔ Ein globales Layout (AppLayoutComponent)
enthält mat-drawer-container

enthält <app-sidenav>

enthält <router-outlet>

✔ Jede Seite entscheidet selbst:
ob die Sidenav sichtbar ist

welche Elemente angezeigt werden

✔ Ein SidenavService mit Signals
visible = signal(false)

items = signal<MenuItem[]>([])

Jede Seite kann beim Betreten sagen:

ts
this.sidenav.show([
  { label: 'Übersicht', fragment: 'overview' },
  { label: 'Details', fragment: 'details' }
]);
Oder:

ts
this.sidenav.hide();
🧩 Schritt 1: SidenavService (Signals)
ts
import { Injectable, signal } from '@angular/core';

export interface MenuItem {
  label: string;
  fragment?: string;
  route?: string;
}

@Injectable({ providedIn: 'root' })
export class SidenavService {
  visible = signal(false);
  items = signal<MenuItem[]>([]);

  show(items: MenuItem[]) {
    this.items.set(items);
    this.visible.set(true);
  }

  hide() {
    this.visible.set(false);
    this.items.set([]);
  }
}
🧩 Schritt 2: Sidenav-Komponente (Child)
ts
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, NgFor],
  template: `
    <mat-drawer
      mode="over"
      [opened]="service.visible()"
      (closedStart)="service.visible.set(false)"
    >
      <button
        *ngFor="let item of service.items()"
        (click)="navigate(item)"
      >
        {{ item.label }}
      </button>
    </mat-drawer>
  `
})
export class SidenavComponent {
  constructor(public service: SidenavService, private router: Router) {}

  navigate(item: MenuItem) {
    if (item.route) this.router.navigate([item.route]);
    if (item.fragment) this.router.navigate([], { fragment: item.fragment });
    this.service.visible.set(false);
  }
}
🧩 Schritt 3: Layout-Komponente (Parent)
html
<mat-drawer-container class="layout">
  <app-sidenav />

  <div class="content">
    <router-outlet />
  </div>
</mat-drawer-container>
🧩 Schritt 4: Jede Seite entscheidet selbst
Beispiel: Seite A will eine Navigation
ts
@Component({
  standalone: true,
  template: `...`
})
export class PageAComponent {
  constructor(private sidenav: SidenavService) {}

  ngOnInit() {
    this.sidenav.show([
      { label: 'Intro', fragment: 'intro' },
      { label: 'Kapitel 1', fragment: 'chapter1' }
    ]);
  }
}
Beispiel: Seite B will keine Sidenav
ts
@Component({
  standalone: true,
  template: `...`
})
export class PageBComponent {
  constructor(private sidenav: SidenavService) {}

  ngOnInit() {
    this.sidenav.hide();
  }
}
*/