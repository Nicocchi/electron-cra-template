require('v8-compile-cache');
const { app, BrowserWindow, ipcMain} = require("electron");
const electron = require('electron')

const _HOME_ = require("os").homedir();
const _SEP_ = require("path").sep;
const _APPHOME_ = `${_HOME_}${_SEP_}.ingenium${_SEP_}`;


// The main window
let mainWindow = null;

// windows[i] = new BrowserWindow({
//     width: displays[i].bounds.width,
//     height: displays[i].bounds.height,
//     x: displays[i].bounds.x,
//     y: displays[i].bounds.y,
//     resizable: false,
//     transparent: false,
//     fullscreen: true,
//     movable: false,
//     skipTaskbar: true,
//     type: "desktop",
//     useContentSize: true,
//     icon: `${__dirname}/icon.png`,
//     webPreferences: {
//         preload: path.join(__dirname, "preload.js"),
//         nodeIntegrationInWorker: true,
//         webSecurity: true,
//         backgroundThrottling: false
//     }
// });

/**
 * Create the main window
 *
 */
function createMainWindow() {
	const isDev = require("electron-is-dev");
	const path = require("path");
	// let bounds = electron.screen.getPrimaryDisplay().bounds;
	// let x = Math.ceil(bounds.x + ((bounds.width - 1200) / 2));
	// let y = Math.ceil(bounds.y + ((bounds.height - 800) / 2));

	const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
	let x = width / 4
	let y = height / 4
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		resizable: false,
		x: x,
		y: y,
		center: true,
		icon: `${__dirname}/icon.png`,
		webPreferences: {
			nodeIntegration: false,
			nodeIntegrationInWorker: true,
			webSecurity: false,
			preload: path.join(__dirname, "preload.js"),
		}
	});

	// mainWindow.webContents.openDevTools();
	mainWindow.setMenu(null);
	mainWindow.allowRendererProcessReuse = true;
	// Load React
	// mainWindow.openDevTools();
	mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on("ready", () => {
	const { globalShortcut } = require("electron");

	// Create the main window
	createMainWindow();

	// Register a 'CommandOrControl+X' shortcut listener
	const ret = globalShortcut.register("CommandOrControl+7", () => {
		createMainWindow();
	});
});

app.once("before-quit", () => {
	window.removeAllListeners("close");
});

// Quit when all windows are closed.
app.on("window-all-closed", function() {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== "darwin") app.quit();
});

app.on("activate", function() {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
});
