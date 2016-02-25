const electron = require('electron');
const ipc = electron.ipcRenderer;
const $ = require('jquery');
const $imageView = $('.imageView');
const $translatedTextView = $('.translatedText');
const $openFileButton = $('#open-file');
const $saveFileButton = $('#save-file');
const $readImageButton = $('#read-file');
const remote = electron.remote;
const mainProcess = remote.require('./main');

const output = document.getElementById('output');
const canvas = document.querySelector('.imageView');
const context = canvas.getContext('2d');

ipc.on('file-opened', function (event, filePath) {
  var img = new Image();
  const OCRAD = require('ocrad.js');
  img.onload = function (event) {
    var imagePic = context.drawImage(event.target, 10, 10, event.target.width, event.target.height);
  }
  img.src = "file://" + filePath;
});

$openFileButton.on('click', function() {
  mainProcess.openFile();
});

$readImageButton.on('click', function(){
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext('2d');
  var image = ctx.getImageData(10,10,750,80);
  var parsedText = OCRAD(image);
  console.log(parsedText)
  output.innerHTML = parsedText;
})

$saveFileButton.on('click', function(){
  var string = $translatedTextView.val();
  mainProcess.saveFile(string);
});
