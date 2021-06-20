# REST service

This is an Express application, the application implements REST API.

## Prerequisites

- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/slobby/rest-service.git -b task6
```

## Installing NPM modules

```
npm install
```

## Building application

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

### Using Docker

1. git clone https://github.com/slobby/rest-service.git -b task6
2. run in cmd command

```
docker compose -p task7 up
```

3. Run in other console all tests.
4. Run in other console lint check.

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
