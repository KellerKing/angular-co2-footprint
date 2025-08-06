import { Routes } from '@angular/router';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TabellePageComponent } from './pages/tabelle-page/tabelle-page.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
    },
    {
        path: 'about',
        component: AboutPageComponent
    },
    {
        path: 'tabelle',
        component: TabellePageComponent
    },
];
