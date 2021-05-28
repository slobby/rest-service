# REST service

This is an Express application, the application implements REST API.

## Prerequisites

- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/slobby/rest-service.git -b task4
```

## Installing NPM modules

```
npm install
```

## Check 1 part

Go to link https://github.com/slobby/rest-service/releases/tag/1.-Complite-first-part-jsdoc

or switch to commit

```
git checkout 3341940c28c531b18a97732ae66870599db36d10
```
## Create jsdoc files

```
npm run doc
```

## Build application
switch to head

```
git checkout
```

```
npm run build
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
