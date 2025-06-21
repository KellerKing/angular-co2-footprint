import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <h1>Welcome to {{ title }}!</h1>
    <app-header
      [headerData]="{
        headerEntries: [
          { title: 'Home', link: '/', sortOrder: 1, isActive: true },
          { title: 'About', link: '/about', sortOrder: 2, isActive: false }
        ]
      }"
    >
    </app-header>
    <div class="container text-center">
      <div class="row">
        <div class="col">Column</div>
        <div class="col">Column</div>
        <div class="col">Column</div>
      </div>
    </div>
    <div class="card" style="width: 18rem;">
      <img src="..." class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card’s content.
        </p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>

    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'angular-demo';
}
