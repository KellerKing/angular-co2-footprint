import { Component, input } from '@angular/core';
import { HeaderDto } from './headerDto';
import { HeaderEntryDto } from './headerEntryDto';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-light bg-light navbar-expand-lg ps-3">
      <a class="navbar-brand" [routerLink]="['/']">
        <img [src]=[this.headerData()?.logoUrl] width="100" height="40" class="d-inline-block align-top" alt="">
      </a>
      <button (click)="toggleNavbar()"
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          @for (item of getSortedHeaderEntries(); track $index) {
            <!-- exact: true damit / nicht z.B zu /impressum aktiv wird -->
            <a 
              routerLink={{item.routerLink}} 
              routerLinkActive="active" 
              [routerLinkActiveOptions]="{exact: true}" 
              class="nav-item nav-link">
              {{item.title}}
            </a>
          } @empty {
            <span class="nav-item">No entries available</span>
          }
        </div>
      </div>
    </nav>
  `,
  styles: ``,
})
export class HeaderComponent {
  headerData = input<HeaderDto>();


  getSortedHeaderEntries(): HeaderEntryDto[] {
    return (
      this.headerData()?.headerEntries?.sort(
        (a: HeaderEntryDto, b: HeaderEntryDto) => a.sortOrder - b.sortOrder
      ) || []
    );
  }

  toggleNavbar() : void {
    const navbar = document.querySelector('.navbar-collapse');
    if (!navbar) return;
    navbar.classList.toggle('show');  
  }
}

 //https://angular.dev/guide/components/inputs
//https://v18.angular.dev/guide/signals/model
//https://angular.dev/guide/routing
