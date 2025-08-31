import { Routes } from '@angular/router';
import { HomePageContainer } from './pages/home-page/home-page-container';
import { AboutPageContainer } from './pages/about-page/about-page-container';
import { TabellePageContainer } from './pages/tabelle-page/tabelle-page-component';

export const routes: Routes = [
    {
        path: '',
        component: HomePageContainer,
    },
    {
        path: 'about',
        component: AboutPageContainer
    },
    {
        path: 'tabelle',
        component: TabellePageContainer
    },
];
