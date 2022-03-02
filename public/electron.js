const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev"); // To check if electron is running in dev mode or not

// The main window
let mainWindow = null;

// Template application menu
const menuTemplate = [
	{ id: '1', label: 'one' },
	{ type: 'separator' },
	{ id: '3', label: 'three', beforeGroupContaining: ['1'] },
	{ id: '4', label: 'four', afterGroupContaining: ['2'] },
	{ type: 'separator' },
	{ id: '2', label: 'two' }
  ]

/**
 * Creates the main window of the application
 *
 */
function createMainWindow() {
	mainWindow = new BrowserWindow({
		
		width: 1200, 						// Integer - Window's width in pixels
		height: 800, 						// Integer - Window's height in pixels
		resizable: true, 					// Boolean - Whether window is resizable
		center: true, 						// Boolean - Show window in the center of the screen
		icon: `${__dirname}/logo192.png`, 		// NativeImage | String - The window icon. 
												// On Windows it is recommended to use ICO icons to get best visual effects, you can 
												// also leave it undefined so the executable's icon will be used.
												// __dirname is the /src/ folder
											// Settings of web page's features.
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),	// Specifies a script that will be loaded before other scripts run in the page. 
															// This script will always have access to node APIs no matter whether node integration 
															// is turned on or off. The value should be the absolute file path to the script. When node 
															// integration is turned off, the preload script can reintroduce Node global symbols back 
															// to the global scope
		}
	});

	// Load React. If in development, show the current server (with hotreload) else, show
	// the built version
	mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);

	// Open the DevTools in "detached" state if in development
	if (isDev) {
		mainWindow.webContents.openDevTools({ mode: "detach" });
	}

	// Set up the application menu
	const menu = Menu(menuTemplate);
    Menu.setApplicationMenu(menu);

	// While loading the page, this event will be emitted when the renderer
	// process has rendered the page for the first time if the window has not
	// been shown yet. Showing the window after this event will have no visual flash
	mainWindow.once("ready-to-show", () => {
		mainWindow.show();
	})
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on("ready", () => {

	// Create the main window
	createMainWindow();
});

// Emitted before the application starts closing its windows
app.once("before-quit", () => {
	window.removeAllListeners("close");
});

// Quit when all windows are closed.
app.on("window-all-closed", function () {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
});
