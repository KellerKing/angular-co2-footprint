import { HeaderEntryDto } from "./headerEntryDto";

export class HeaderDto {
  headerEntries: HeaderEntryDto[];
  logoUrl?: string;
  
  constructor(headerEntries: HeaderEntryDto[], logoUrl?: string) {
    this.headerEntries = headerEntries;
    this.logoUrl = logoUrl;
  }
}