import { Inject, Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { DatabaseServiceHelper, FehlerResult } from './database.service.helper';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private supabaseUrl = 'https://ynwvtfdglmlzfmagsrlc.supabase.co';
  private supabaseKey = 'sb_publishable_PH5QOoZ5eBRrior-T-JckQ_FXGH7d0c';
  private supabase = createClient(this.supabaseUrl, this.supabaseKey);

  async getData(land: string, firma: string): Promise<DatenbankResult<CO2Data[]>> {
    try {
      let query = this.supabase.from('co2Verbrauch').select('*');

      const landOhneSonderzeichen = DatabaseServiceHelper.entferneSonderzeichen(land);
      const firmaOhneSonderzeichen = DatabaseServiceHelper.entferneSonderzeichen(firma);

      if (land) query = query.ilike('country', `%${landOhneSonderzeichen}%`);
      if (firma) query = query.ilike('company_name', `%${firmaOhneSonderzeichen}%`);

      const { data, error } = await query;
      if (error) return { success: false, error: this.generiereFehler(error) };

      return { success: true, data: data as CO2Data[] };
    } catch (error) {
      return { success: false, error: this.generiereFehler(error) };
    }
  }
  private generiereFehler(error: unknown): Fehler {
    const fehlerAusHelper = DatabaseServiceHelper.generiereFehler(error);

    //Mapping um nicht an den Helper gebunden zu sein.
    return {
      message: fehlerAusHelper.message,
      details: fehlerAusHelper.details,
      abhilfe: fehlerAusHelper.abhilfe,
    };
  }
}

export interface CO2Data {
  id: number;
  country: string;
  company_name: string;
  co2_verbrauch: number;
}

export interface Fehler {
  message: string;
  details?: string;
  abhilfe?: string;
}

export type DatenbankResult<T> =
  | { success: true; data: T } //Erfolgsfall . Angular weis dann welche Felder es gibt
  | { success: false; error: Fehler }; // Fehlerfall. Angular weis dann welche Felder es gibt
