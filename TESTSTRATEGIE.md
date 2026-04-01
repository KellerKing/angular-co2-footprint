# Teststrategie (Studienprojekt)

## Ziel

In diesem Projekt werden automatisierte Tests bewusst in drei Ebenen genutzt:

- Smoke-Tests: pruefen, ob zentrale Bausteine grundsaetzlich starten.
- Unit-Tests: pruefen isolierte Logik einzelner Klassen/Komponenten.
- Integrationstests: pruefen das Zusammenspiel mehrerer Teile (z. B. Router, Komponenten, Services).

So entsteht ein verstaendlicher Nachweis, dass sowohl Einzelfunktionen als auch relevante Nutzerablaeufe abgesichert sind.

## 1. Smoke-Tests

**Charakteristik**

- Sehr schnell und stabil.
- Fokus auf "lebt die Komponente/Seite grundsaetzlich?"
- Keine tiefe Fachlogik.

**Beispiele im Projekt**

- `src/app/page/page-about/page-about.spec.ts` -> `should create`
- `src/app/page/page-home/page-home.spec.ts` -> `should create`
- `src/app/layout/footer/footer.component.spec.ts` -> `should create`

## 2. Unit-Tests

**Charakteristik**

- Testen eine einzelne Einheit isoliert.
- Externe Abhaengigkeiten werden nicht als echtes Gesamtsystem verwendet.
- Ziel: Fachlogik schnell und praezise pruefen.

**Beispiele im Projekt**

- `src/app/service/lokale-navigation.service.spec.ts`
  - `nutzeNavigation(...)` setzt Sichtbarkeit und Elemente korrekt.
  - `deaktivereNavigation()` setzt den Zustand korrekt zurueck.
- `src/app/service/settings.service/settings.service.spec.ts`
  - Sprach- und Storage-Faelle fuer RTL/LTR-Logik.
- `src/app/page/page-tabelle/components/tabelle-component/tabelle.component.spec.ts`
  - Seiten-/Paginator-Logik.
  - Sortierbeispiel (Firmennamen aufsteigend).

## 3. Integrationstests

**Charakteristik**

- Testen das Zusammenspiel mehrerer Einheiten.
- Typisch: Komponente + Service-Mock + Lifecycle + Rendering.
- Hoehere Aussagekraft fuer reale Nutzerablaeufe als reine Unit-Tests.

**Beispiele im Projekt**

- `src/app/page/page-tabelle/page-tabelle.spec.ts`
  - Initiales Laden ueber Service.
  - Suchaenderung fuehrt zu neuem Serviceaufruf.
  - Mockdaten zeigen veraenderte Eintragsanzahl nach Filterung.
  - `ngOnInit` registriert die lokale Navigation.
- `src/app/app.spec.ts`
  - App-level Routing-Integration: per Header-Link zu About und zurueck zu Home.
  - Pruefung von Route und gerendertem Seiteninhalt.

## Warum das fuer die Studienarbeit sinnvoll ist

- Die Testarten sind klar voneinander abgegrenzt.
- Die Beispiele sind fachlich nachvollziehbar und direkt im Code belegbar.
- Die Automatisierung ist nicht "zu viel", sondern zeigt strukturiertes Vorgehen und Qualitaetsbewusstsein.

## Grenzen und bewusste Entscheidungen

- Smoke-/Integrationstests greifen nicht auf eine produktive Datenbank zu.
- Datenabhaengige Tests werden mit Mockdaten ausgefuehrt, damit sie stabil und reproduzierbar bleiben.
- Ein optionaler End-to-End-Test kann spaeter als Bonus ergaenzt werden, ist fuer dieses Studienprojekt aber nicht zwingend.

