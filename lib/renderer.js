const electron = require('electron');
const ipc = electron.ipcRenderer;
const $ = require('jquery');
const $translatedTextView = $('.translatedText');
const $openFileButton = $('#open-file');
const $saveFileButton = $('#save-file');
const remote = electron.remote;
const mainProcess = remote.require('./main');

const OCRAD = require('ocrad.js');
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
const img = new Image();

ipc.on('file-opened', function (event, filePath) {
  getImageDataFromPath(filePath, (data) => console.log(data));
});

$openFileButton.on('click', function() {
  mainProcess.openFile();
});

$saveFileButton.on('click', function(){
  var string = $translatedTextView.val();
  mainProcess.saveFile(string);
});

function getImageDataFromPath(filePath, callback) {
  img.onload = function () {
    if (typeof callback === 'function') {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);
      var imageData = context.getImageData(0, 0, img.width, img.height);
      var parsedText = OCRAD(imageData);
      output.innerHTML = parsedText;
      callback(imageData, output);
    }
  }
  img.src = 'file://' + filePath;
};
