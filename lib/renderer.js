const electron = require('electron');
const ipc = electron.ipcRenderer;
const $ = require('jquery');
const $imageView = $('.imageView');
const $translatedTextView = $('.translatedText');
const $openFileButton = $('#open-file');
const $saveFileButton = $('#save-file');
const $copyHtmlButton = $('#copy-html');
const remote = electron.remote;
const mainProcess = remote.require('./main');


ipc.on('file-opened', function (event, content) {
  $imageView.text(content);
  //this is going to change. i'm assuming this will actually be were the canvas is loaded.
});

$openFileButton.on('click', function() {
  mainProcess.openFile();
});

$saveFileButton.on('click', function(){
  var string = $translatedTextView.val();
  mainProcess.saveFile(string);
});
