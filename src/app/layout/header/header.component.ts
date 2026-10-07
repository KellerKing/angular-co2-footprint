import { Component, ElementRef, input, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header-component',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  navItems = input.required<NavItem[]>();
  homeItem = input.required<HomeItem>();

  private collapsableNav = viewChild.required<ElementRef>("collapse");

  toggleNavbar(): void {
    if (!this.collapsableNav()) return;
    this.collapsableNav().nativeElement.classList.toggle('show');
  }
}

export interface NavItem {
  label: string;
  link: string;
}

export interface HomeItem {
  homeLink: string;
  logoUrl: string;
}
