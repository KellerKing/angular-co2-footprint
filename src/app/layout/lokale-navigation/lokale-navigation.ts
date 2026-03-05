import { Component, inject, input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-lokale-navigation',
  imports: [RouterModule],
  templateUrl: './lokale-navigation.html',
  styleUrl: './lokale-navigation.css',
})
export class LokaleNavigation {

  navigationItems = input.required<LokaleNavigationInputItem[]>();

  private readonly m_ActivatedRoute = inject(ActivatedRoute);


  constructor() {
  this.m_ActivatedRoute.fragment.subscribe((fragment: string | null) => {
      if (fragment) this.jumpToSection(fragment);
    });
  }

  jumpToSection(section: string | null) {
    console.log("Jumping to section:", section);
    if (section) document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }
}


export interface LokaleNavigationInputItem {
  label: string;
  route: string;
}
