
//* -------------------------------------------------------------------------- */
//*                                 DEFINITIONS                                */
//* -------------------------------------------------------------------------- */

const electron = require('electron')
const fs = require('fs')
const path = require('path')
// const url = require('url')
const { app, BrowserWindow, ipcMain } = require('electron')
const env = process.env.NODE_ENV || 'development'




//* If development environment
if (env === 'development') {
	try {
		require('electron-reloader')(module, {
			debug: false,
			watchRenderer: false,
		})
	} catch (_) {
		console.log('Error')
	}
}

//* -------------------------------------------------------------------------- */
//*                               SET ENVIROMENT                               */
//* -------------------------------------------------------------------------- */
//_ process.env.NODE_ENV = 'development'
const isDev = process.env.NODE_ENV !== 'production'
var nWid = 0
isDev ? nWid = 1800 : nWid = 1600



let childWindow

//* Main Window 
function createMainWindow() {
	const mainWindow = new BrowserWindow({
		width : nWid,
		height: 1200,
		minWidth: 600,
		minHeight: 400,
		frame: false,
		show: false,
		icon  : `${__dirname}/assets/icons/eGPF1.png`,
		webPreferences: {
			preload: path.join(__dirname, 'js', 'preload.js'),  //! Window buttom control
			nodeIntegration: true,
			enableRemoteModule: true,
			worldSafeExecuteJavaScript: true,
			// webSecurity: isDev ? false : true,
		},

	})
	
	mainWindow.once('ready-to-show', () => {
		mainWindow.show()
		isDev ? mainWindow.webContents.send('init', 'isDev') : mainWindow.webContents.send('init', 'notDev')
	})

	
	//* 	DEV TOOLS DETTACHED
	//_ if (isDev) {
	//_ 	const devtools = new BrowserWindow({
	//_ 		width : 600,
	//_ 		height: 1000,
	//_ 		icon  : `${__dirname}/assets/icons/eGPF1.png`,
	//_ 		webPreferences: {
	//_ 			nodeIntegration: true,
	//_ 			// enableRemoteModule: true,
	//_ 		},
	//_ 	})
	//_ 	mainWindow.webContents.setDevToolsWebContents(devtools.webContents)
	//_ 	mainWindow.webContents.openDevTools({ mode: 'detach' })
	//_ }

	mainWindow.loadFile('index.html')
	mainWindow.webContents.send('log', [__dirname])
	// mainWindow.maximize()



	childWindow = new BrowserWindow({
		width : 300,
		height: 200,
		resizable: false,
		frame: false,
		parent: mainWindow,
		modal: true,
		
		// show: true,
		show: false,
		icon  : `${__dirname}/assets/icons/eGPF1.png`,
		webPreferences: {
			preload: path.join(__dirname, 'js', 'preload.js'),  //! Window buttom control
			nodeIntegration: true,
			enableRemoteModule: true,
			worldSafeExecuteJavaScript: true,
			// webSecurity: isDev ? false : true,
		},

	})


}




//* -------------------------------------------------------------------------- */
//*                               App initialize                               */
//* -------------------------------------------------------------------------- */

app.whenReady().then(createMainWindow)	//.then(cwOpenSQMA)
ipcMain.on('qDev', (event, arg) => {
	isDev ? mainWindow.webContents.send('init', 'isDev') : mainWindow.webContents.send('init', 'notDev')
})

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

