export interface HeaderModel {
  headerEntries: HeaderEntryModel[],
  logoUrl?: string;
  homeLink?: string;
}

export interface HeaderEntryModel {
  title: string;
    sortOrder: number;
    isActive: boolean;
    routerLink: string;
}