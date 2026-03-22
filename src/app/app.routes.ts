import { Routes } from '@angular/router';
import { PageHome } from './page/page-home/page-home';
import { PageAbout } from './page/page-about/page-about';

export const routes: Routes = [ 
    {path: 'tabelle', loadComponent: () => import('./page/page-tabelle/page-tabelle').then(m => m.PageTabelle)},
    {path: '', component: PageHome},
    {path: 'about', component: PageAbout},
    {path: '**', component: PageHome},
];
