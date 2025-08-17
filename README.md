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

### Depyloment

Es gibt eine Github Action die manuell gestartet werden muss (**angular-co2-footprint-deploy**). Als Branch kann nur Master ausgewählt werden. Wenn 
 

## Verwendete Technologien Frameworks

## Projekt lokal starten

## Known Issues

# AngularDemo

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.0.

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

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
