import { describe, it, expect } from 'vitest';
import { DatabaseServiceHelper } from './database.service.helper';
import { PostgrestError } from '@supabase/supabase-js';

describe("DatabaseServiceHelper", () => {
  it("Unit-Test: entferneSonderzeichen - Prozent", () => {
    const input = "test%value";
    const expected = "test\\%value";

    const result = DatabaseServiceHelper.entferneSonderzeichen(input);

    expect(result).toBe(expected);
  });

  it("Unit-Test: entferneSonderzeichen - Unterstrich", () => {
    const input = "test_value";
    const expected ="test\\_value";

    const result = DatabaseServiceHelper.entferneSonderzeichen(input);

    expect(result).toBe(expected);
  });

  it("Unit-Test: entferneSonderzeichen - Sternchen", () => {
    const input = "test*value";
    const expected = "test\\*value";

    const result = DatabaseServiceHelper.entferneSonderzeichen(input);

    expect(result).toBe(expected);
  });

  it("Unit-Test: entferneSonderzeichen - Leerer Strings", () => {
    const result = DatabaseServiceHelper.entferneSonderzeichen("");

    expect(result).toBe("");
  });

  it("Unit-Test: entferneSonderzeichen - Alle Zeichen in einem String", () => {
    const input = "test%_*value";
    const expected = "test\\%\\_\\*value";

    const result = DatabaseServiceHelper.entferneSonderzeichen(input);

    expect(result).toBe(expected);
  });

  it("Unit-Test: entferneSonderzeichen - Normale Zeichen", () => {
    const input = "normalString123";
    const expected = "normalString123";

    const result = DatabaseServiceHelper.entferneSonderzeichen(input);

    expect(result).toBe(expected);
  });

  const defaultAbhilfe =
    "Bitte versuchen Sie es später erneut oder kontaktieren Sie: andreasks56@gmail.com";

  it("Unit-Test: generiereFehler - PostgrestError", () => {
    const mockError = new PostgrestError({
      message: "Das ist die Message",
      details: "Ich bin der Detailbereich",
      hint: "Ich bin der Hinweis",
      code: "Fehlercode123",
    });

    const result = DatabaseServiceHelper.generiereFehler(mockError);

    expect(result.message).toBe(mockError.message);
    expect(result.details).toContain("Code: Fehlercode123");
    expect(result.details).toContain("Details: Ich bin der Detailbereich");
    expect(result.details).toContain("Hinweis: Ich bin der Hinweis");
    expect(result.abhilfe).toBe(defaultAbhilfe);
  });

  it("Unit-Test: generiereFehler - Normaler Error", () => {
    const mockError = new Error("Klaus Kleber");

    const result = DatabaseServiceHelper.generiereFehler(mockError);

    expect(result.message).toBe("Klaus Kleber");
    expect(result.details).toContain("Error: Klaus Kleber");
    expect(result.abhilfe).toBe(defaultAbhilfe);
  });

  it("Unit-Test: generiereFehler - Unbekannter Error", () => {
    const mockError = { customProperty: 'customValue' };

    const result = DatabaseServiceHelper.generiereFehler(mockError);

    expect(result.message).toBe("Ein unbekannter Fehler ist aufgetreten.");
    expect(result.details).toBe("Details: " + JSON.stringify(mockError));
    expect(result.abhilfe).toBe(defaultAbhilfe);
  });

  it("Unit-Test: generiereFehler - null", () => {
    const result = DatabaseServiceHelper.generiereFehler(null);

    expect(result.message).toBe("Ein unbekannter Fehler ist aufgetreten.");
    expect(result.details).toBe("Details: Nicht verfügbar");
    expect(result.abhilfe).toBe(defaultAbhilfe);
  });
});
