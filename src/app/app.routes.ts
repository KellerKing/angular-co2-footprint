import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutPageComponent } from './about-page/about-page.component';

export const routes: Routes = [
    {
        path: 'about',
        component: AboutPageComponent
    }
];
