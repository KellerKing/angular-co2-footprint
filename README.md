## Link zur Live Version

- https://kellerking.github.io/angular-co2-footprint/


## Beschreibung

Das ist meine lösung implementierung der Aufgabenstellung 1 der Fallstudie des Moduls IPWA01-01. Konkret geht es darum, eine Webanwendung zu entwickeln, die mittels moderner Javascript und oder CSS Frameworks aufegbaut ist. 


## Branching Strategie /Entwicklung

Es wird sich im groben an Gitflow orientiert (https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow). 
Es gibt zwei Haupt Branches. Master und Develop.

Auf dem Developbranch wird entwickelt. Von diesem Branch werden feature Branches abgebranched. Wenn diese fertig sind, werden Pull Requests auf Develop gestellt. Ab jetzt beginnt ein unterschied zu Gitflow. Eigentlich würde zu gegebener Zeit auf basis von Develop ein Release Branch erstellt. Auf diesem würden Bugfixes gemacht werden und eben das Release. Wenn der fertig ist, würde dieser nach master/main migriert werden, das Release gelöscht und dann von master nach develop gemerged.

In diesem Projekt ist kein Release Branch vorgesehen, da es keine produktive Anwendung ist und es keine Releases im klassischen Sinne gibt. Im Fall dieses Projekt wird ein Pull Request von develop nach master erstellt wenn genug features im develop integriert wurden. Ausgehend vom Master wird dann ein deployment vorgenommen. Release Versionen/Tags gibt es hier nicht und wären für eine nicht produktive Anwendung overhead.

Es ist wichtig zu wissen, dass dieses vorgehen eingehalten werden muss. Es kann nicht direkt auf develop oder master entwickelt werden. Wenn etwas auf master gefixed wird, wird abgebranched und dann per Pull Request wieder in master integriert und auch sofort nach develop. 


## Pipelines 

Es gibt zwei Pipelines. Einmal eine CI und eine für das Deployment. Sie werden hier erklärt.


### CI

**angular-co2-footprint-ci**
Diese Pipeline baut das Projekt und führt die Tests aus. Sie wird getriggert wenn auf master und develop gepushed oder ein pull request darauf erstellt wird. Aufgrund einer Richtlinie kann der Pullrequest nur ausgeführt werden wenn die Pipeline und somit alle Tests erfolgreich gelaufen sind. Dadurch soll zu jedem Zeitpunkt ein funktionierender Stand auf den beiden Hauptbranches existieren.


### Depyloment

Es gibt eine Github Action die manuell gestartet werden muss (**angular-co2-footprint-deploy**). Als Branch kann nur Master ausgewählt werden. Sie bsut die Komponente und depolyed sie als Github Page. Da die Ci Pipeline bereits die Tests ausführt wird hier darauf verzichtet. Eine besonderheit ist bei build, dass der Basispfad (href) angepasst wird. Das liegt an der Url der Github Page. **Sollte das Repo umbenannt werden, muss unbedingt der Build step angepasst werden.**
 

## Verwendete Technologien/Frameworks

Auflistung der wichtigsten Technologien

- [Angular CLI](https://github.com/angular/angular-cli) version 19.0.0.
- [Bootstrap](https://getbootstrap.com) version 5.3.7
- [Angular Material](https://material.angular.dev) version 19.2
- [Karma tests - Kommt mit Angular mit ](https://karma-runner.github.io/6.4/index.html) version 6.4
- [Puppeteer headless Browser ](https://pptr.dev) version 24.16


## Projekt lokal starten

**Voraussetzungen**
- Installierte Version von npm >= 22
- Zugriff auf ein Terminal

**Starten**

Mit diesem Befehl startet der Server in der Entwicklungsumgebung und ist unter `http://localhost:4200/` erreichbar.

```bash
ng serve
```
Mit dem folgendem Befehl startet der Browser automatisch mit der entsprechenden Url. 

```bash
ng s -o
```

**Testen**

## Known Issues


## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```
