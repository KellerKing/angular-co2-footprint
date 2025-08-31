import { Injectable } from '@angular/core';
import { SanitizeResult } from './sanitize-result';

@Injectable({ providedIn: 'root' })
export class Sanitizer {
  sanitize(input: string): SanitizeResult {
    const result: SanitizeResult = {
      wertOhneFehler: input,
      fehler: [],
      hasFehler: false,
    };

    if (!input) return result;

    const whitelist = /^[\p{L}\p{N}\s._-]+$/u; // nur Buchstaben, Zahlen, Leerzeichen, ._-

    const sonderzeichenResult = this.filterSonderzeichen(input.trim());
    result.hasFehler = result.hasFehler || sonderzeichenResult.hasFehler;
    result.wertOhneFehler = sonderzeichenResult.wertOhneFehler;
    result.fehler.push(...sonderzeichenResult.fehler);

    const sqlResult = this.filtereSql(result.wertOhneFehler);
    result.hasFehler = result.hasFehler || sqlResult.hasFehler;
    result.wertOhneFehler = sqlResult.wertOhneFehler;
    result.fehler.push(...sqlResult.fehler);

    const whiteListResult = this.filterWhiteList(
      whitelist,
      result.wertOhneFehler
    );
    result.hasFehler = result.hasFehler || whiteListResult.hasFehler;
    result.wertOhneFehler = whiteListResult.wertOhneFehler;
    result.fehler.push(...whiteListResult.fehler);

    return result;
  }

  private filterSonderzeichen(input: string): SanitizeResult {
    const sonderzeichen = /(--|;|<|>|\/\*|\*\/)/g;
    const match = input.match(sonderzeichen);
    return this.result(input, sonderzeichen, match);
  }

  private filterWhiteList(whiteList: RegExp, input: string): SanitizeResult {
    const blacklist = new RegExp(`[^${whiteList.source.replace(/^\^\[|\]\+\$$/g, '')}]+`, 'gu');
    const match = input.match(blacklist);
    return this.result(input, blacklist, match);
  }

  private filtereSql(input: string): SanitizeResult {
    const schluesselbegriffeSql =
      /\b(SELECT|INSERT|UPDATE|DELETE|DROP|WHERE)\b/gi;
    const match = input.match(schluesselbegriffeSql);

    return this.result(input, schluesselbegriffeSql, match);
  }

  private result(
    input: string,
    regex: RegExp,
    match: RegExpMatchArray | null
  ): SanitizeResult {
    if (match) {
      return {
        wertOhneFehler: input.replace(regex, ''),
        hasFehler: true,
        fehler: match,
      };
    }

    return {
      wertOhneFehler: input,
      fehler: [],
      hasFehler: false,
    };
  }
}
