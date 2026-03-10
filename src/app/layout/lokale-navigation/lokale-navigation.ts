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