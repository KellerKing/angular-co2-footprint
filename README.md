## Link zur Live Version

https://kellerking.github.io/angular-co2-footprint/


## Beschreibung

Das ist meine lösung implementierung der Aufgabenstellung 1 der Fallstudie des Moduls IPWA01-01. Konkret geht es darum, eine Webanwendung zu entwickeln, die mittels moderner Javascript und oder CSS Frameworks aufegbaut ist. 


## Projekt lokal starten

**Voraussetzungen**
- Installierte Version von npm >= 10 
- Installiertes Angular-CLI (```npm install -g @angular/cli ```)
- Zugriff auf ein Terminal


### Starten / Dev Umgebung

Mit diesem Befehl startet der Server in der Entwicklungsumgebung und ist unter `http://localhost:4200/` erreichbar. Navigiert man zu dieser URL im Browser öffnet sich die Seite. 

```bash
ng serve
```
Alternativ folgender Befehl wenn sich der Brower automatisch öffnen soll.
```bash
ng serve -o
```

### Bauen

Baut in `dist/` Ordner.
```bash
ng build
```

### Testen

Die Tests werden mit **Vitest** ausfeführt. Es gibt 2 möglichkeiten die Tests zu starten. 

Mit UI: Dieser Weg ist in der angular.json händisch definiert. Es startet sich eine grafische OBerfläche die die Tests startet und bei bedarf können sie händisch angestoßen werden.
```bash
npm run test_ui
```

Standard: Per npm test werden die Tests in der Konsole gestartet im "watch-modus". **Er kann über die Taste q verlassen werden.** Das besondere ist allerdings, dass wenn Entwickelt wird und eine Änderung erkannt wird durch z.B Speichern, dann starten die Tests wieder automatisch. 
```bash
npm test
```


## Branching Strategie /Entwicklung

Es wird sich im **groben** an Gitflow orientiert (https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow). 
Es gibt zwei Haupt Branches. master und develop.
*Heute würde man den master main nennnen, aber master war noch in meiner config glaube ich eingestellt*

Auf dem *develop* wird entwickelt. Von diesem Branch werden feature Branches erzeugt. Wenn diese fertig sind, werden Pull Requests nach *develop* gestellt. Ab jetzt beginnt ein unterschied zu Gitflow. Eigentlich würde zu gegebener Zeit auf basis von Develop ein Release Branch erstellt. Auf diesem würden Bugfixes gemacht werden und eben das Release. Wenn der fertig ist, würde dieser nach master/main migriert werden, das Release gelöscht und dann von master nach develop gemerged.

In diesem Projekt ist kein Release Branch vorgesehen, da es keine produktive Anwendung ist und es keine Releases im klassischen Sinne gibt. Im Fall dieses Projekt wird ein Pull Request von develop nach master erstellt wenn genug features im develop integriert wurden. Ausgehend vom Master wird dann ein deployment vorgenommen. Release Versionen/Tags gibt es hier nicht und wären für eine nicht produktive Anwendung overhead.

Es ist wichtig zu wissen, dass dieses vorgehen eingehalten werden muss. Es kann nicht direkt auf develop oder master entwickelt werden. Wenn etwas auf master gefixed wird, wird abgebranched und dann per Pull Request wieder in master integriert und auch sofort nach develop. 


## Pipelines / Actions

Es gibt zwei Pipelines. Einmal eine CI und eine für das Deployment. Sie werden hier erklärt.


### CI

**angular-co2-footprint-ci**
Diese Pipeline baut das Projekt und führt die Tests aus. Sie wird getriggert wenn auf irgendeinen Branch gepushed wird. Aber auch bei Pull Requests auf master und develop. Aufgrund einer Richtlinie kann der Pullrequest auf die genannten Branches nur ausgeführt werden wenn die Pipeline und somit alle Tests erfolgreich gelaufen sind. Dadurch soll zu jedem Zeitpunkt ein funktionierender Stand auf den beiden Hauptbranches existieren.


### Depyloment

Es gibt eine Github Action die manuell gestartet werden muss (**angular-co2-footprint-deploy**). Als Branch kann nur *master* ausgewählt werden. Sie bsut die Komponente und depolyed sie als Github Page. Da die Ci Pipeline bereits die Tests ausführt wird hier darauf verzichtet. Eine besonderheit ist bei build, dass der Basispfad (href) angepasst wird. Das liegt an der Url der Github Page. **Sollte das Repo umbenannt werden, muss unbedingt der Build step angepasst werden.**
 

## Verwendete Technologien/Frameworks

Auflistung der wichtigsten Technologien (Stand aus `package.json`):

- Angular: Version 21.2.x 
- Angular Material: Version 21.2.x
- Bootstrap: Version 5.3.8
- Supabase JavaScript SDK: Version 2.86.2 (`@supabase/supabase-js`)
- Vitest: Version ^4.0.8 (Test) --> Kommt mit Angular mit


## Known Issues

- Auf der Github Seite, kommt der Fehler 404 wenn versucht wird neu zu laden und man sich nicht auf der Home Page befindet.