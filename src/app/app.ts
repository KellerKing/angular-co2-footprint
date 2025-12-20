import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent, NavItem } from "./layout/header/header.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-co2-footprint');
  
  readonly navItems: NavItem[] = [
    { label: 'Home', link: '' },
    { label: 'Tabelle', link: 'tabelle' }, 
    { label: 'Über', link: 'about' }];  

  readonly homeItem = {
    homeLink: '',
    logoUrl: 'logo_iu.svg'
  };
}
