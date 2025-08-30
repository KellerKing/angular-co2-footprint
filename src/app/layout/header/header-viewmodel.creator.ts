import { HeaderModel } from './header.model';

export function createViewModels(): HeaderModel {
  return {
    logoUrl: 'logo_iu.svg',
    homeLink: '',
    headerEntries: [
      { title: 'Home', routerLink: '', sortOrder: 1, isActive: true },
      {
        title: 'Tabelle',
        routerLink: 'tabelle',
        sortOrder: 2,
        isActive: false,
      },
      {
        title: 'About',
        routerLink: 'about',
        sortOrder: 3,
        isActive: false,
      },
    ],
  };
}
