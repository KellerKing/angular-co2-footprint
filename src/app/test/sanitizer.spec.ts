
import { TestBed } from '@angular/core/testing';
import { Sanitizer } from '../pages/tabelle-page/components/filtertabelle/sanitizer/sanitizer';

describe('Sanitizer', () => {
  let sut: Sanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Sanitizer],
    });
    sut = TestBed.inject(Sanitizer);
  });

  it('sollte erstellt werden', () => {
    expect(sut).toBeTruthy();
  });

  it('gibt unverändert zurück, wenn leerer String übergeben wird', () => {
    const result = sut.sanitize('');
    expect(result.wertOhneFehler).toBe('');
    expect(result.hasFehler).toBeFalse();
    expect(result.fehler).toEqual([]);
  });

  it('lässt erlaubte Zeichen  unverändert', () => {
    const input = 'Abc_123- Test.txt';
    const result = sut.sanitize(input);
    expect(result.wertOhneFehler).toBe(input);
    expect(result.hasFehler).toBeFalse();
    expect(result.fehler).toEqual([]);
  });

  it('trimmt führende und nachfolgende Whitespaces ohne Fehler zu setzen', () => {
    const result = sut.sanitize('   Abc  ');
    expect(result.wertOhneFehler).toBe('Abc'); // durch input.trim() in filterSonderzeichen
    expect(result.hasFehler).toBeFalse();
    expect(result.fehler).toEqual([]);
  });

  it('entfernt definierte Sonderzeichen-Tokens und sammelt Treffer', () => {
    const result = sut.sanitize('a--b;<c>/*x*/');
    expect(result.wertOhneFehler).toBe('abcx');
    expect(result.hasFehler).toBeTrue();
    expect(result.fehler).toEqual(['--', ';', '<', '>', '/*', '*/']);
  });

  it('filtert SQL-Schlüsselwörter (case-insensitive) mit Wortgrenze', () => {
    const result = sut.sanitize('foo SELECT bar');
    expect(result.wertOhneFehler).toBe('foo  bar'); // "SELECT" entfernt, doppeltes Leerzeichen bleibt
    expect(result.hasFehler).toBeTrue();
    expect(result.fehler).toEqual(['SELECT']);
  });

  it('entfernt nicht erlaubte Zeichen via Whitelist und gruppiert zusammenhängende Sequenzen', () => {
    const result = sut.sanitize('abc$€–def');
    expect(result.wertOhneFehler).toBe('abcdef');
    expect(result.hasFehler).toBeTrue();
    // Der Whitelist-Blacklist-RegEx fasst "$€–" als eine Sequenz zusammen
    expect(result.fehler).toEqual(['$€–']);
  });

  it('kombiniert alle Filter: Sonderzeichen, SQL, Whitelist', () => {
    const result = sut.sanitize('  --select€ ');
    expect(result.wertOhneFehler).toBe(''); // alles weggefiltert
    expect(result.hasFehler).toBeTrue();
    expect(result.fehler).toEqual(['--', 'select', '€']);
  });

  it('unterstützt Unicode-Buchstaben (z. B. Umlaute) aus der Whitelist', () => {
    const input = 'ÄÖÜß é';
    const result = sut.sanitize(input);
    expect(result.wertOhneFehler).toBe('ÄÖÜß é');
    expect(result.hasFehler).toBeFalse();
    expect(result.fehler).toEqual([]);
  });

  it('entfernt SQL-Schlüsselwort, aber belässt erlaubte Nachbarschaftszeichen', () => {
    const result = sut.sanitize('SELECT-Test_1');
    // "SELECT" entfernt, Bindestrich, Text und Underscore bleiben
    expect(result.wertOhneFehler).toBe('-Test_1');
    expect(result.hasFehler).toBeTrue();
    expect(result.fehler).toEqual(['SELECT']);
  });

  it('lässt Zeilenumbrüche (Whitespace) in der Mitte zu', () => {
    const result = sut.sanitize('foo\nbar');
    expect(result.wertOhneFehler).toBe('foo\nbar');
    expect(result.hasFehler).toBeFalse();
    expect(result.fehler).toEqual([]);
  });
});