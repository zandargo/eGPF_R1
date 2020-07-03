
const electron = require('electron')
const path = require('path')
// const url = require('url')
const { app, BrowserWindow } = require('electron')
const env = process.env.NODE_ENV || 'development'

// If development environment
if (env === 'development') {
	try {
		require('electron-reloader')(module, {
			debug: true,
			watchRenderer: true,
		})
	} catch (_) {
		console.log('Error')
	}
}

//* Set enviroment
process.env.NODE_ENV = 'development'
const isDev = process.env.NODE_ENV !== 'production'

//* Main Window
function createMainWindow() {
	const mainWindow = new BrowserWindow({
		width : 1600,
		height: 950,
		minWidth: 600,
		minHeight: 400,
		frame: false,
		show: false,
		icon  : `${__dirname}/assets/icons/eGPF1.png`,
		webPreferences: {
			// preload: path.join(__dirname, 'preload.js'),  //! ???
			preload: path.join(__dirname, 'js', 'preload.js'),  //! ???
			nodeIntegration: true,
			enableRemoteModule: true,
			// webSecurity: isDev ? false : true,
		},

	})
	
	mainWindow.once('ready-to-show', () => {
		mainWindow.show()
	})

	if (isDev) {
		const devtools = new BrowserWindow({
			width : 500,
			height: 1000,
			icon  : `${__dirname}/assets/icons/eGPF1.png`,
			webPreferences: {
				nodeIntegration: true,
				enableRemoteModule: true,
			},
		})

		mainWindow.webContents.setDevToolsWebContents(devtools.webContents)
		mainWindow.webContents.openDevTools({ mode: 'detach' })
	}
	mainWindow.loadFile('index.html')

	mainWindow.webContents.send("log", [__dirname])

}

//* App initialize
app.whenReady().then(createMainWindow)

//* Closing
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

//* ? Don't instantiate?
app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createMainWindow()
	}
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
