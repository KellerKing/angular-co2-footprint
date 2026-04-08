import { Routes } from '@angular/router';
import { PageHome } from './page/page-home/page-home';

export const routes: Routes = [ 
    {path: 'tabelle', loadComponent: () => import('./page/page-tabelle/page-tabelle').then(m => m.PageTabelle)},
    {path: '', component: PageHome},
    {path: 'about', loadComponent: () => import('./page/page-about/page-about').then(m => m.PageAbout)},
    {path: '**', redirectTo: '/', pathMatch: 'full'},
];
