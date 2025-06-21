export class HeaderEntryDto {
  title: string;
  logoUrl?: string;
  sortOrder: number;
  isActive: boolean;
  link: string;

  constructor(title: string, link: string, sortOrder: number, isActive: boolean) {
    this.title = title;
    this.link = link;
    this.sortOrder = sortOrder;
    this.isActive = isActive;
  }
}