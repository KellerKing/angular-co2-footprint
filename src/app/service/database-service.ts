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
    let query = this.supabase
      .from('co2Verbrauch')
      .select('*');

    if (land)
      query = query.ilike('country', `%${land}%`);
    if (firma)
      query = query.ilike('company_name', `%${firma}%`);

    const { data, error } = await query;
    if (error) {
      console.error('Error fetching data:', error);
      return [];
    }
    
    return data as CO2Data[];
  }
}

export interface CO2Data {
  id: number;
  country: string;
  company_name: string;
  co2_verbrauch: number;
}
