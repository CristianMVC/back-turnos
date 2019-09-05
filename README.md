## Get Started

 - https://tfs.hexacta.com/tfs/Rohan/SistemaNacionalDeTurnos
 - https://hxgitlab.hexacta.com/SistemaNacionalDeTurnos/back-office

# SntBackOffice

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.3.

## Development server

Run `yarn run start` for a dev server. Navigate to `http://localhost:4201/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `yarn run ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `yarn run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `yarn run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `yarn run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Tagging

- yarn upgrade-version numeroDeVersion , Ej yarn upgrade-version 0.5.0
- git commit -m '0.5.0'
- git tag 0.5.0 sha
- git push origin develop
- git push origin --tags

## Deploy

- ssh hexacta@hxv-snt.hexacta.com
- cd test/snt-back-testing/ or cd test/snt-back-master/
- git pull origin testing or git pull origin master
- yarn run build-prod
- cd ~/scripts/
- ./snt-back-sync.sh or ./snt-back-sync.sh master

## FIN

