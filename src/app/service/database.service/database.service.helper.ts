import { PostgrestError } from '@supabase/supabase-js';

export class DatabaseServiceHelper {
  /* Supabase ist zwar gegen Injektion abgesichert, aber Stern oder Fragezeichen werden als Platzhalter interpretiert. Das ist aus meiner Sicht kein Fehler, aber je nach dem 
  wie streng man die Aufgabe sieht, wäre das schon ein Fehler */
  static entferneSonderzeichen(value: string): string {
    return value.replace(/[%_*]/g, (char) => `\\${char}`);
  }

  static generiereFehler(error: unknown): FehlerResult {
    if (error instanceof PostgrestError) {
      return  {
            message: error.message,
            details: `Code: ${error.code} \r\n Details: ${error.details} \r\n Hinweis: ${error.hint}`,
            abhilfe: 'Bitte versuchen Sie es später erneut oder kontaktieren Sie: andreasks56@gmail.com'
        };
    }
    if (error instanceof Error) {
        return {
            message: error.message,
            details: error.stack,
            abhilfe: 'Bitte versuchen Sie es später erneut oder kontaktieren Sie: andreasks56@gmail.com'
        };
    }

    return {
        message: 'Ein unbekannter Fehler ist aufgetreten.',
        details: (error ? "Details: " + JSON.stringify(error) : "Details: Nicht verfügbar"),
        abhilfe: 'Bitte versuchen Sie es später erneut oder kontaktieren Sie: andreasks56@gmail.com'
    };
  }
}

export interface FehlerResult {
    message: string;
    details?: string;
    abhilfe: string;
}