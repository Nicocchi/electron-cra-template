<h1 align="center">Electron CRA Boilerplate Template</h1>

<p align="center">
  <img src="https://github.com/Nicocchi/electron-cra-template/blob/main/public/logo192.png?raw=true" alt="React Logo" />
</p>


<p align="center">Simple boilerplate for setting up ReactJS and Electron together</p>

# Scripts
```
"dev": "concurrently -k \"BROWSER=none yarn start\" \"yarn:electron\"",
"electron": "wait-on tcp:3000 && electron ."
```

`start` Starts the application with a default of no browser and starts electron script

`electron` Starts react and then waits for it to load before starting electron

# Run

You can use `yarn start` to start the project in development mode

# Build

You can use `yarn build` to start building the project. The executible will be in the `dist` folder

# Dependencies

## Main

- [react](https://reactjs.org/) - React is a JavaScript library for creating user interfaces.
- [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) - Check if Electron is running in development

## Dev
- [concurrently](https://github.com/open-cli-tools/concurrently) - Run multiple commands concurrently.
- [electron](https://www.electronjs.org/) - The Electron framework lets you write cross-platform desktop applications using JavaScript, HTML and CSS.
- [wait-on](https://github.com/jeffbski/wait-on) - Command line utility which will wait for files, ports, sockets, and http(s) resources to become available (or not available using reverse mode).
- [electron-builder](https://github.com/electron-userland/electron-builder) - A complete solution to package and build a ready for distribution Electron, Proton Native app for macOS, Windows and Linux with “auto update” support out of the box.

# License
MIT