
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
		height: 900,
		frame: false,
		icon  : `${__dirname}/assets/icons/eGPF1-256x256.png`,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			nodeIntegration: true,
		},
	})
	
	if (isDev) {
		const devtools = new BrowserWindow({
			width : 500,
			height: 1000,
			icon  : `${__dirname}/assets/icons/eGPF1-256x256.png`,
			webPreferences: {
				nodeIntegration: true,
			},
		})
		mainWindow.webContents.setDevToolsWebContents(devtools.webContents)
		mainWindow.webContents.openDevTools({ mode: 'detach' })
	}
	mainWindow.loadFile('index.html')
	console.log('Opening DevToools...')

}

//* App initialize
app.whenReady().then(createMainWindow)
console.log('TESTE PÓS create mainwindow...')

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
