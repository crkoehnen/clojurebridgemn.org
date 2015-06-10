/* ClojureBridgeMN.org
   Copyright © 2015 Tom Marble
   Licensed under the MIT license
   https://github.com/clojurebridge-minneapolis/clojurebridgemn.org
*/

var page = require('webpage').create();
var url = phantom.args[0];

function exit(code) {
  setTimeout(function(){ phantom.exit(code); }, 0);
  phantom.onError = function(){};
}

page.onConsoleMessage = function (message) {
  console.log(message);
};

function runtests() {
  console.log("Loaded____: " + url);

  var result = page.evaluate(function() {
    return testing.runner.runtests(true);
  });

  if (result != 0) {
    // console.log("*** Test failed! ***");
    exit(1);
  }
  else {
    // console.log("Test succeeded.");
    exit(0);
  }
}

page.onLoadFinished = function (status) {
  if (status != "success") {
    console.log('Failed to load ' + url);
    exit(1);
  }
  runtests();
};

function openCallback(status) {
  if (status != "success") {
    console.log('Failed to open ' + url);
    phantom.exit(1);
  }
  // console.log("opened: " + url);
};

console.log("Loading...: " + url);

page.open(url, openCallback);
