import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

/**
 * Typ-sichere Fehlerbehandlung für DatabaseService
 * Ermöglicht Unterscheidung zwischen verschiedenen Fehlertypen
 */
export type DataFetchResult<T> = 
  | { success: true; data: T }
  | { success: false; error: DatabaseError };

export interface DatabaseError {
  type: 'network' | 'auth' | 'validation' | 'unknown';
  message: string;
  originalError?: Error;
}

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private supabaseUrl = 'https://ynwvtfdglmlzfmagsrlc.supabase.co';
  private supabaseKey = 'sb_publishable_PH5QOoZ5eBRrior-T-JckQ_FXGH7d0c';
  private supabase = createClient(this.supabaseUrl, this.supabaseKey);

  /**
   * Holt Daten mit verbesserter Error-Behandlung
   * @returns Result-Objekt mit success/error Status für bessere Fehlerbehandlung im UI
   */
  async getData(land: string, firma: string): Promise<DataFetchResult<CO2Data[]>> {
    try {
      let query = this.supabase.from('co2Verbrauch').select('*');

      if (land) query = query.ilike('country', `%${DatabaseService.entferneSonderzeichen(land)}%`);
      if (firma) query = query.ilike('company_name', `%${DatabaseService.entferneSonderzeichen(firma)}%`);

      const { data, error } = await query;
      
      if (error) {
        return {
          success: false,
          error: this.mapSupabaseError(error)
        };
      }
      
      return {
        success: true,
        data: data as CO2Data[]
      };
    } catch (err) {
      return {
        success: false,
        error: {
          type: 'unknown',
          message: 'Unerwarteter Fehler beim Datenabruf',
          originalError: err instanceof Error ? err : undefined
        }
      };
    }
  }

  /**
   * Mapt Supabase-Fehler zu standardisiertem Format
   * Ermöglicht spezifische Fehlerbehandlung im UI
   */
  private mapSupabaseError(error: any): DatabaseError {
    const message = error.message || 'Unbekannter Fehler';
    
    if (message.includes('401') || message.includes('auth')) {
      return {
        type: 'auth',
        message: 'Authentifizierungsfehler. Bitte laden Sie die Seite neu.',
        originalError: error
      };
    }
    
    if (message.includes('ECONNREFUSED') || message.includes('network')) {
      return {
        type: 'network',
        message: 'Netzwerkfehler. Überprüfen Sie Ihre Internetverbindung.',
        originalError: error
      };
    }
    
    return {
      type: 'validation',
      message: `Fehler beim Abrufen der Daten: ${message}`,
      originalError: error
    };
  }

  /**
   * Escape-Funktion für LIKE-Wildcards
   * Supabase ist zwar gegen SQL-Injektion abgesichert, aber Stern oder Fragezeichen
   * werden als Platzhalter interpretiert. Diese Funktion escapt diese Zeichen.
   * 
   * Beispiel: "test*" → "test\\*"
   */
  private static entferneSonderzeichen(value: string): string {
    if (!value) return '';
    return value.replace(/[%_*]/g, (char) => `\\${char}`);
  }
}

export interface CO2Data {
  id: number;
  country: string;
  company_name: string;
  co2_verbrauch: number;
}
