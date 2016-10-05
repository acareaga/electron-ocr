const electron = require('electron');
const ipc = electron.ipcRenderer;
const $ = require('jquery');
const $translatedTextView = $('.translatedText');
const $openFileButton = $('#open-file');
const $saveFileButton = $('#save-file');
const $camera         = $('#open-camera')
const remote = electron.remote;
const mainProcess = remote.require('./main');

const OCRAD = require('ocrad.js');
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
const img = new Image();

var desktopSharing = false;
var videoStream
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

$camera.on('click',toggleButton)

function toggleButton(){
  if (!desktopSharing){
    utilizeCamera.bind(this)()
  }
 launchCamera.bind(this)()
}

function launchCamera(){
  desktopSharing = false
  videoStream.getTracks()[0].stop();
  videoStream = null;
  this.innerHTML = 'Use Camera'
}

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


function utilizeCamera(){
  this.innerHTML = "Take Photo"
  navigator.webkitGetUserMedia({
   audio: false,
   video: {
     mandatory: {
       minWidth: 1280,
       maxWidth: 1280,
       minHeight: 720,
       maxHeight: 720
     }
   }
 }, recieveVideoStream, onFail);

 function recieveVideoStream(stream) {
   videoStream = stream;
   document.querySelector('video').src = URL.createObjectURL(stream);
 }

 function onFail(event) {
   console.log('error');
 }
}
