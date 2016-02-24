const electron = require('electron');
const app = electron.app;
const dialog = electron.dialog;
const fs = require('fs');
var OCRAD = require('ocrad.js');
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
var mainWindow = null;
const canvas = require('canvas');
require('locus');

app.on('ready', function () {
  console.log('suh dude');
  mainWindow = new BrowserWindow()

  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.on('closed',function(){
    mainWindow = null;
  })
});

// UPLOAD IMAGE TO CANVAS
// GRAB FILE
const openFile = function () {
  var files = dialog.showOpenDialog(mainWindow, {
    properties: ['openFile']
  });

  if (!files) { return; }
  var file = files[0];
  var content = fs.readFileSync(file);
  return placeImageOnCanvas(content);

    // var imageToText = OCRAD(content)
    // we need to load the canvas into the applicatoin and then we need to grab the imate data (it's a constructor)
    // and essentially print it out onto the page.
  // mainWindow.webContents.send('file-opened', content);
};

function placeImageOnCanvas(content) {
  var img = new canvas.Image; // CREATE A NEW IMAGE TO PLACE FILE ON
  img.src = content;
  var canvas = new Canvas(img.width, img.height);
  var ctx = canvas.getContext('2d');


    eval(require('locus'));a
  return ctx.drawImage(img, 0, 0, img.width / 4, img.height /4);
}


//this.height, this.height <--- agnostic


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
