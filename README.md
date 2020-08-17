# sharely-api

NodeJS REST API for Sharely app

## Setup

Install required dependencies

- nodejs v12
- mongodb v4
- postman (for testing endpoints)

Clone the repository (duh ...)

Install node deps using `npm install`

Create a folder for the database files called `mongo`. Open a new terminal in vscode and start the database server using `mongod --dbpath ./mongo`

Here's a sample lauch json config for VS Code (put the contents in `.vscode/launch.json`)

```JSON
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "program": "${workspaceFolder}/src/main.ts",
      "sourceMaps": true,
      "outFiles": ["${workspaceFolder}/dist/**/*.js"],
      "envFile": "${workspaceFolder}/.env.local"
    }
  ]
}

```

At this point everything is set up for running the node server. Press `F5` to start the VS Code debugger and watch the magic happen in the console.
