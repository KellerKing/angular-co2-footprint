import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private supabaseUrl = 'https://ynwvtfdglmlzfmagsrlc.supabase.co';
  private supabaseKey = 'sb_publishable_PH5QOoZ5eBRrior-T-JckQ_FXGH7d0c';
  private supabase = createClient(this.supabaseUrl, this.supabaseKey);

  async getData(land: string, firma: string): Promise<CO2Data[]> {
    let query = this.supabase.from('co2Verbrauch').select('*');

    if (land) query = query.ilike('country', `%${this.entferneSonderzeichen(land)}%`);
    if (firma) query = query.ilike('company_name', `%${this.entferneSonderzeichen(firma)}%`);

    const { data, error } = await query;
    if (error) {
      console.error('Fehler beim Abrufen der Daten:', error);
      return [];
    }
    
    return data as CO2Data[];
  }

  /* Supabase ist zwar gegen Injektion abgesichert, aber Stern oder Fragezeichen werden als Platzhalter interpretiert. Das ist aus meiner Sicht kein Fehler, aber je nach dem 
  wie streng man die Aufgabe sieht, wäre das schon ein Fehler */
  private entferneSonderzeichen(value: string): string {
    return value.replace(/[%_*]/g, (char) => `\\${char}`);
  }
}

export interface CO2Data {
  id: number;
  country: string;
  company_name: string;
  co2_verbrauch: number;
}
