import { Routes } from '@angular/router';
import { PageTabelle } from './page-tabelle/page-tabelle';
import { PageHome } from './page/page-home/page-home';
import { PageAbout } from './page/page-about/page-about';

export const routes: Routes = [ 
    {path: 'tabelle', component: PageTabelle},
    {path: '', component: PageHome},
    {path: 'about', component: PageAbout},
    {path: '**', component: PageHome},
];
