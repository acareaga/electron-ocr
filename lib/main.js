const electron = require('electron');
const app = electron.app;
const dialog = electron.dialog;
const fs = require('fs');
var OCRAD = require('ocrad.js');
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;


var mainWindow = null;

app.on('ready', function () {
  console.log('suh dude');
  mainWindow = new BrowserWindow()

  mainWindow.loadURL('file://' + __dirname + '/index.html');



  mainWindow.on('closed',function(){
    mainWindow = null;
  })
});

const openFile = function () {
  var files = dialog.showOpenDialog(mainWindow, {
    properties: ['openFile']
  });

  if (!files) { return; }

  var file = files[0];

  var content = fs.readFileSync(file).toString();
  // var imageToText = OCRAD(content)
  // we need to load the canvas into the applicatoin and then we need to grab the imate data (it's a constructor)
  // and essentially print it out onto the page.
  mainWindow.webContents.send('file-opened', content);
};

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
