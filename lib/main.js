const electron = require('electron');
const app = electron.app;
const dialog = electron.dialog;
const fs = require('fs');
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
var mainWindow = null;
const OCRAD = require('./ocrad.js');

app.on('ready', function () {
  console.log('suh dude');
  mainWindow = new BrowserWindow()
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.on('closed',function(){
    mainWindow = null;
  })
});

const openFile = function () {
  var file = dialog.showOpenDialog(mainWindow, {
    properties: ['openFile']
  });
  if (!file) { return; }
  mainWindow.webContents.send('file-opened', file[0]);
};

// const convertText = function () {

// };

// SAVE FILE
const saveFile = function (content) {
  var fileName = dialog.showSaveDialog(mainWindow, {
    title: 'Save String Output',
    defaultPath: app.getPath('documents'),
    filters: [
      { name: 'HTML Files', extensions: ['html'] }
    ]
  });

  if (!fileName) { return; }

  fs.writeFileSync(fileName, content);
};

exports.openFile = openFile;
exports.saveFile = saveFile;
// exports.convertText = convertText;
