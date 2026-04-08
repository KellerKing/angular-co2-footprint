# Test-Strategie Notizen fuer die Studienarbeit

## Ziel der Darstellung
Ich moechte den Unterschied zwischen Unit- und Integrationstests an einem realen Angular-Projekt erklaeren.

## Aktueller Stand
- 14 Spec-Dateien im Projekt
- 49 Tests (laut aktuellem Projektstand)
- Fokus der Arbeit: Qualitaet der Testebenen, nicht maximale Testanzahl

## Empfohlene Kernbeispiele fuer die Arbeit

### 1. SettingsService
- Datei: src/app/service/settings.service/settings.service.spec.ts
- Ebene: Unit plus integrationsnahe Service-Tests
- Was ich zeige:
1. Unit-Fall mit Mocking von navigator.language
2. Fall mit sessionStorage (persistente Einstellungen)
3. Fehlerbehandlung bei ungueltigem JSON
- Didaktischer Nutzen: Sehr gut, weil Isolierung und reale Browser-Abhaengigkeit direkt verglichen werden koennen.

### 2. DatabaseServiceHelper
- Datei: src/app/service/database.service/database.service.helper.spec.ts
- Ebene: Reiner Unit-Test
- Was ich zeige:
1. String-Sanitizing
2. Fehlerobjekt-Transformation
- Didaktischer Nutzen: Zeigt klar, wie Unit-Tests ohne Angular-TestBed auskommen.

### 3. App-Komponente
- Datei: src/app/app.spec.ts
- Ebene: Integration auf App-Ebene (kein E2E)
- Was ich zeige:
1. Navigation ueber Header-Links
2. Sichtbarer Seiteninhalt nach Routing
3. Lokale Navigation auf der Tabellen-Seite
4. Fallback-Verhalten bei unbekannter Route
- Didaktischer Nutzen: Verbindet Router, Komponenten und DOM-Verifikation in einem zusammenhaengenden Nutzerfluss.

### 4. PageTabelle
- Datei: src/app/page/page-tabelle/page-tabelle.spec.ts
- Ebene: Integration Komponente plus Service
- Was ich zeige:
1. Suchmodell triggert neuen Service-Aufruf
2. Suchaenderung aktualisiert sichtbare Daten
3. Keine Treffer fuehren zu leerer Tabelle
4. Lokale Navigation wird im Lifecycle gesetzt
- Didaktischer Nutzen: Sehr gutes Beispiel fuer Datenfluss und Lifecycle-Effekte.

## Unterschied der zwei Testaufbauten bei PageTabelle

### A) Modell direkt setzen (z. B. `component.sucheModel.set(...)`)
- Einordnung: Integrationstest (Komponente plus Service), aber eher komponentennah.
- Was wird geprueft:
1. Reaktiver Datenfluss in der Komponente
2. Service-Aufruf mit richtigen Parametern
3. Ergebnis im ViewModel
- Vorteile:
1. Schnell und stabil
2. Weniger fragil bei HTML-Refactoring
3. Gut fuer fachliche Logik und Datenfluss
- Typischer Einsatz: Wenn ich pruefen will, ob die Suchlogik korrekt reagiert.

### B) Ueber HTML-Elemente aendern (Input setzen plus Event dispatch)
- Einordnung: Ebenfalls Integrationstest, aber UI-naher.
- Was wird zusaetzlich geprueft:
1. Template-Binding (Input -> Modell)
2. Event-Wiring im Template
3. Zusammenspiel aus DOM, Komponente und Service
- Vorteile:
1. Realitaetsnaeher aus Nutzersicht
2. Deckt Fehler im Template auf, die Modell-Tests nicht sehen
- Nachteile:
1. Etwas langsamer
2. Etwas fragiler bei HTML-Aenderungen
- Typischer Einsatz: Wenn ich zeigen will, dass Eingaben in der UI wirklich im Modell und im Ergebnis ankommen.

### Fazit zur Auswahl
- Beide sind Integrationstests, aber mit unterschiedlicher Naehe zur UI.
- Empfehlung fuer die Arbeit:
1. Hauptsaechlich modellnahe Integrationstests (stabil und klar)
2. Ergaenzend ein gezielter UI-naher Integrationstest als Nachweis fuer Template-Binding

## Was ich in der Arbeit klar benennen sollte
- Unit-Test: Testet Logik moeglichst isoliert, mit Mocks/Stubs.
- Integrationstest: Testet Zusammenspiel mehrerer Teile (z. B. Komponente plus Router oder Komponente plus Service).
- E2E-Test: Wuerde eine laufende Anwendung in einem echten Browser testen. Solche Tests sind in diesen Beispielen nicht enthalten.

## Empfohlene Praesentationsreihenfolge
1. DatabaseServiceHelper als einfachster Unit-Einstieg
2. SettingsService fuer Unit versus integrationsnahe Faelle
3. PageTabelle fuer Komponente-Service-Integration
4. App fuer App-weite Integration mit Routing

## Leitfragen fuer die Erklaerung je Test
1. Welche Schicht teste ich?
2. Was ist echt und was ist gemockt?
3. Welches Risiko wird reduziert?
4. Warum ist dieser Test nicht Unit oder nicht E2E?

## Kurzes Fazit fuer die Arbeit
Mit diesen vier Beispielen kann ich nachvollziehbar zeigen, warum verschiedene Testebenen noetig sind: Unit-Tests sichern Kernlogik schnell ab, Integrationstests sichern Zusammenspiel und Nutzerfluesse innerhalb der Anwendung.