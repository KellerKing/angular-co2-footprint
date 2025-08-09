import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  imports: [],
  template: `
    <div class="rounded bg-light-blue container  p-3">
      <div class="row">
        <div class="col">
          <h1>Home Page</h1>
          <p>Welcome to the home page!</p>
          <p>This is a simple Angular application.</p>
          <p>Feel free to explore the features and functionalities.</p>
        </div>
        <div class="col">
          <img src="Regenwald.png" class="img-fluid rounded" alt="Regenwald" />
        </div>
      </div>
    </div>

    <p class="m-4">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde voluptate
      minima, molestias saepe eligendi mollitia vero. Natus labore delectus in,
      fugiat sed, perspiciatis itaque tenetur odit sint veritatis, beatae
      cumque.
    </p>
  `,
  styles: ``,
})
export class HomePageComponent {}
