import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})

export class DatabaseService {
  private supabaseUrl = 'https://ynwvtfdglmlzfmagsrlc.supabase.co';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlud3Z0ZmRnbG1semZtYWdzcmxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxODY2NjksImV4cCI6MjA4MDc2MjY2OX0.J0JdzAk175Ioabwl9K6sXyQP15bLUSmPlBk_bz4JXzA';
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
    return data as CO2Data[];
  }

  test() : void {
    this.supabase.from('co2Verbrauch').insert({country: 'Germany'}).then(({ data, error }) => {
      console.log(data, error);
    });
  }
}

export interface CO2Data {
  id: number;
  country: string;
  company_name: string;
  co2_verbrauch: number;
}
