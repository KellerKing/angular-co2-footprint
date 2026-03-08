import {
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LokaleNavigationService } from './lokale-navigation.service';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-lokale-navigation',
  imports: [RouterModule, MatSidenavModule],
  templateUrl: './lokale-navigation.html',
  styleUrl: './lokale-navigation.css',
})
export class LokaleNavigation  {

  readonly m_NavigationService = inject(LokaleNavigationService); 


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

    navigereZuFragment(fragmentId: string) {
    if (fragmentId) document.getElementById(fragmentId)?.scrollIntoView({ behavior: 'smooth' });
    this.m_NavigationService.isVisible.set(false);
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
Wenn ich die Sindenav haben will, dann will ich links oder rechts, je nach Schriftkultur einen Butten haben um sie darzustellen
Alles klar – du willst also folgendes Verhalten:

Wenn eine Seite die Sidenav nutzt, soll links oder rechts ein Button erscheinen,

abhängig von der Schriftkultur (LTR/RTL),

und dieser Button soll die Sidenav öffnen.

Das lässt sich perfekt lösen, und zwar komplett signal‑basiert, ohne dass jede Seite selbst Buttons einbauen muss.

Ich zeige dir die sauberste Architektur für Angular 21.

🌍 1) LTR/RTL automatisch erkennen
Angular setzt dir="ltr" oder dir="rtl" automatisch, wenn du es im html-Tag angibst.

Du kannst es aber auch im Code abfragen:

ts
import { inject, Directionality } from '@angular/cdk/bidi';

dir = inject(Directionality);
Dann bekommst du:

ts
dir.value === 'ltr' // links
dir.value === 'rtl' // rechts
🧱 2) Layout-Komponente: Button abhängig von LTR/RTL anzeigen
Dein globales Layout enthält:

den Button (links oder rechts)

die Sidenav-Komponente

den Main Content

Template
html
<div class="layout">

  <!-- Button links oder rechts -->
  <button
    class="toggle-btn"
    [class.left]="dir.value === 'ltr'"
    [class.right]="dir.value === 'rtl'"
    *ngIf="sidenav.visible()"
    (click)="sidenav.open()"
  >
    ☰
  </button>

  <mat-drawer-container>
    <app-sidenav />

    <div class="content">
      <router-outlet />
    </div>
  </mat-drawer-container>

</div>
CSS (Tailwind oder klassisch)
css
.toggle-btn {
  position: fixed;
  top: 1rem;
  z-index: 1000;
}

.toggle-btn.left {
  left: 1rem;
}

.toggle-btn.right {
  right: 1rem;
}
🧩 3) SidenavService steuert Sichtbarkeit + Items
Du hast das schon fast fertig, hier die vollständige Version:

ts
@Injectable({ providedIn: 'root' })
export class SidenavService {
  visible = signal(false);
  items = signal<MenuItem[]>([]);
  opened = signal(false);

  show(items: MenuItem[]) {
    this.items.set(items);
    this.visible.set(true);
  }

  hide() {
    this.visible.set(false);
    this.items.set([]);
    this.opened.set(false);
  }

  open() {
    this.opened.set(true);
  }

  close() {
    this.opened.set(false);
  }
}
🧩 4) Sidenav-Komponente (Child)
ts
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, NgFor],
  template: `
    <mat-drawer
      mode="over"
      [opened]="service.opened()"
      (closedStart)="service.close()"
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
    this.service.close();
  }
}
🧩 5) Jede Seite entscheidet selbst
Seite mit Sidenav
ts
ngOnInit() {
  this.sidenav.show([
    { label: 'Intro', fragment: 'intro' },
    { label: 'Kapitel 1', fragment: 'chapter1' }
  ]);
}
Seite ohne Sidenav
ts
ngOnInit() {
  this.sidenav.hide();
}
*/