var url = document.getElementById("result");
var org = document.getElementById("originalUrl");

self.port.on("getresult", function(tinyurl, longurl) {
  console.log(tinyurl);
  console.log(longurl);
  url.value = tinyurl;
  org.innerHTML = longurl;
  url.select();
});
