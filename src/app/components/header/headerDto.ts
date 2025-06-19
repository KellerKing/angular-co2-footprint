export class HeaderDto {
  title: string;
  logoUrl: string;
  sortOrder?: number;
  isActive?: boolean;
  link: string;
  
  constructor(title: string, logoUrl: string, link: string, sortOrder?: number, isActive?: boolean) {
    this.title = title;
    this.logoUrl = logoUrl;
    this.link = link;
    this.sortOrder = sortOrder;
    this.isActive = isActive;
  }
}