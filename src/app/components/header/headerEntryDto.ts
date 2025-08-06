export class HeaderEntryDto {
  title: string;
  sortOrder: number;
  isActive: boolean;
  routerLink: string;

  constructor(title: string, routerLink: string, sortOrder: number, isActive: boolean) {
    this.title = title;
    this.routerLink = routerLink;
    this.sortOrder = sortOrder;
    this.isActive = isActive;
  }
}