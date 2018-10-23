

## Quickstart

### Setup Dependencies

npm install


### Build React App

npm run build_webpack


### Run Application Server

npm run server


## Author

Izzet Demir


## Contents

### Client
Enthält alle Resourcen für den Bau der React App 

*   |_ src - Package für alle Javascript React Module

*    |_ dist - Package für alle Build Artefakte, die Webpack generiert

*    |_ templates - Package für alle statischen Templates, die für Webpack benötigt werden (z. B. Index.html für Single Page und übergreifende CSS)


### Server

*    |_ bin - Ausführungsordner für den Express Server

*        |_ www - Ausführungsmodul für den Express Server

*    |_ routes - Package für alle Route Module. Javascript Module enthalten Backend Geschäftslogik für API Calls

*    |_ app.js - Application Modul

* package.json
* .babelrc - Babel Transpiler Settings für ES2016, ES2015 und React. Die Settings sind vordefiniert und brauchen nicht mehr angepasst zu werden. 
* webpack.config.js - WebPack Bundle Konfiguration. Die Settings sind vordefiniert und brauchen nicht mehr angepasst zu werden. 
* docker-compose.yml

