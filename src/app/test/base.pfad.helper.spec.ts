import { TestBed } from '@angular/core/testing';
import { BasePfadHelper } from '../service/base.pfad.helper';
import { DOCUMENT } from '@angular/common';

interface TestCase {
  beschreibung: string;
  basisUri: string;
  relativerTeil: string;
  expected: string;
}

const testCases: TestCase[] = [
  {
    beschreibung: 'Default-Root und json Pfad der mit ./ anfängt',
    basisUri: '/',
    relativerTeil: './db.json',
    expected: '/db.json',
  },
  {
    beschreibung: 'Default-Root und json Pfad der mit / anfängt',
    basisUri: '/',
    relativerTeil: '/db.json',
    expected: '/db.json',
  },
  {
    beschreibung: 'Default-Root und json Pfad ohne führendes / anfängt',
    basisUri: '/',
    relativerTeil: 'db.json',
    expected: '/db.json',
  },
  {
    beschreibung: 'Default-Root und leerer relativer Pfad',
    basisUri: '/',
    relativerTeil: '',
    expected: '/',
  },
  {
    beschreibung: 'HTTP-Base mit abschließendem Slash',
    basisUri: 'http://example.com/app/',
    relativerTeil: 'assets/img.png',
    expected: 'http://example.com/app/assets/img.png',
  },
  {
    beschreibung:
      'HTTP-Base ohne abschließenden Slash und relativer Pfad mit Slash',
    basisUri: 'http://example.com/app',
    relativerTeil: '/assets/img.png',
    expected: 'http://example.com/app/assets/img.png',
  },
  {
    beschreibung: 'file://-Scheme in GitHub Actions mit Slash',
    basisUri: 'file:///home/runner/dist/',
    relativerTeil: 'main.js',
    expected: 'file:///home/runner/dist/main.js',
  },
  {
    beschreibung: 'file://-Scheme in GitHub Actions ohne Slash im Base',
    basisUri: 'file:///home/runner/dist',
    relativerTeil: '/main.js',
    expected: 'file:///home/runner/dist/main.js',
  },
  {
    beschreibung: 'Lokaler Dev-Server mit Port und Pfad ohne Slash',
    basisUri: 'http://localhost:4200/',
    relativerTeil: 'api',
    expected: 'http://localhost:4200/api',
  },
  {
    beschreibung:
      'Lokaler Dev-Server ohne Slash am Ende und relativer Pfad mit Slash',
    basisUri: 'http://localhost:4200',
    relativerTeil: '/api/',
    expected: 'http://localhost:4200/api/',
  },
  {
    beschreibung: 'HTTPS-Host mit verschachteltem Basispfad',
    basisUri: 'https://host.local/base/',
    relativerTeil: '/nested/path/',
    expected: 'https://host.local/base/nested/path/',
  },
];

describe('BasePfadHelper.getVollstaendigenPfad', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BasePfadHelper],
    });
  });

  testCases.forEach((element) => {
    it(element.beschreibung, () => {
      console.log('==================');

      const mockDocument = { baseURI: element.basisUri };
      TestBed.overrideProvider(DOCUMENT, { useValue: mockDocument });
      const sut = TestBed.inject(BasePfadHelper);
      console.log('base URI: ' + mockDocument.baseURI);
      console.log('Relativer teil: ' + element.relativerTeil);
      console.log('Erwartet: ' + element.expected);

      const result = sut.getVollstaendigenPfad(element.relativerTeil);

      console.log('Ergebnis: ' + result);

      expect(result).toBe(element.expected);
    });
  });
});

describe('BasePfadHelper – Null/Undefined-Handling', () => {
  let sut: BasePfadHelper;
  let mockDocument: Partial<Document>;

  beforeEach(() => {
    mockDocument = { baseURI: null as any };

    TestBed.configureTestingModule({
      providers: [
        BasePfadHelper,
        { provide: DOCUMENT, useValue: mockDocument },
      ],
    });

    sut = TestBed.inject(BasePfadHelper);
  });

  it('gibt "/foo" zurück, wenn baseURI null und relativer Pfad "foo"', () => {
    const result = sut.getVollstaendigenPfad("foo");
    expect(result).toBe('/foo');
  });

  it('gibt nur "/" zurück, wenn baseURI undefined und relativer Pfad undefined', () => {
    // @ts-ignore
    mockDocument.baseURI = undefined;
    // @ts-ignore
    const result = sut.getVollstaendigenPfad(undefined);
    expect(result).toBe('/');
  });
});
