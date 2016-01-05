'use strict';

const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.

// TODO:
app.modulesPath = require('path').join(__dirname, '/node_modules');

// Report crashes to our server.
//electron.crashReporter.start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
	  'title-bar-style': 'hidden',
	  'web-preferences': {
      	'web-security': false
	  },
	  resizable: false,
	  width: 1024,
	  height: 640
  });

  // and load the index.html of the app.
  // TODO: add condition if DEBUG or PROD
  //mainWindow.loadURL('file://' + path.join(__dirname, 'index.html'));
  mainWindow.loadURL('http://localhost:3000/index.html');

  // Open the DevTools.
  // TODO:
  //if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools({detach: true});
  //}
  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
