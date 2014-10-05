var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var Request = require("sdk/request").Request;
var clipboard = require("sdk/clipboard");
var self = require("sdk/self");
var base64 = require("sdk/base64");

var button = buttons.ActionButton({
  id: "mozilla-link",
  label: "Shorturl",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

function shortWithDWZ(longurl, onResult) {
  var urlShortenRequest = Request({
      url: "http://dwz.cn/create.php",
      content: "url=" + tabs.activeTab.url,
      onComplete: function (response) {
          console.log(response.text);
          //if(response.json["status"] == 0)
              //clipboard.set(response.json["tinyurl"]);
          onResult(response.json["tinyurl"], response.json["longurl"]);
      }
  });

  urlShortenRequest.post();
}

function shortWithSina(longurl, onResult) {
  var urlShortenRequest = Request({
      url: "http://www.aidmin.cn/api.php",
      content: "url=" + base64.encode(tabs.activeTab.url) + "&site=googl",
      onComplete: function (response) {
          console.log(response.text);
          onResult(response.json["data"]["short_url"], longurl);
      }
  });

  urlShortenRequest.get();
}

function handleClick(state) {
  shortWithDWZ(tabs.activeTab.url, showResult);
  //shortWithSina(tabs.activeTab.url, showResult);
}

function showResult(tinyurl, longurl) {
    var panel = require("sdk/panel").Panel({
        width: 280,
        contentURL: self.data.url("result.html"),
        contentScriptFile: self.data.url("get_result.js"),
    });

    panel.show({
        position: button
    });
    panel.port.emit("show");
    console.log(tinyurl);
    panel.port.emit("getresult", tinyurl, longurl);
}
