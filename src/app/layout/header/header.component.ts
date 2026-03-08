import { Component, computed, effect, ElementRef, input, signal, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header-component',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header>
      <nav class="navbar navbar-light bg-light navbar-expand-md ps-3 pe-3 shadow-sm">
        <a class="navbar-brand" routerLink="{{ this.homeItem().homeLink }}">
          <img
            src="{{ this.homeItem().logoUrl }}"
            width="100"
            height="40"
            class="d-inline-block align-top"
            alt=""
          />
        </a>
        <button
          (click)="toggleNavbar()"
          class="navbar-toggler btn-sm"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup" #collapse>
          <div class="navbar-nav">
            @for (item of navItems(); track $index) {
            <a
              routerLink="{{ item.link }}"
              [routerLinkActiveOptions]="{ exact: true }"
              routerLinkActive="active"
              class="nav-item nav-link ms-2"
            >
              {{ item.label }}
            </a>
            }
          </div>
        </div>
      </nav>
    </header>
  `,
  styles: [],
})
export class HeaderComponent {
  navItems = input.required<NavItem[]>();
  homeItem = input.required<HomeItem>();

  collapsableNav = viewChild.required<ElementRef>("collapse");

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
