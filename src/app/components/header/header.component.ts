import { Component, input, model } from '@angular/core';
import { HeaderDto } from './headerDto';
import { HeaderEntryDto } from './headerEntryDto';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
    <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
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
            <a class="nav-item nav-link" [class.active] = "item.isActive" [href]="item.link">{{item.title}}</a>
          } @empty {
            <span class="nav-item">No entries available</span>
          }
          <!-- <a class="nav-item nav-link active" href="#">Home <span class="sr-only">(current)</span></a
          >
          <a class="nav-item nav-link" href="#">Features</a>
          <a class="nav-item nav-link" href="#">Pricing</a>
          <a class="nav-item nav-link disabled" href="#">Disabled</a> -->
        </div>
      </div>
    </nav>`,
  styles: ``,
})
export class HeaderComponent {
  headerData = model<HeaderDto>();


  getSortedHeaderEntries(): HeaderEntryDto[] {
    return (
      this.headerData()?.headerEntries?.sort(
        (a: HeaderEntryDto, b: HeaderEntryDto) => a.sortOrder - b.sortOrder
      ) || []
    );
  }
}

 //https://angular.dev/guide/components/inputs
//https://v18.angular.dev/guide/signals/model
