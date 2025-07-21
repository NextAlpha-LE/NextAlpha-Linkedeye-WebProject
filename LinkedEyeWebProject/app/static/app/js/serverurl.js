var origin = window.location.origin.replace("https://", "");
origin = origin.replace("http://", "");
var webserverurl = origin;
// var websocketurl = webserverurl+"/ws/";
var serverurl = window.location.origin;
var monitorurl = new URL("/monitorgraph/", serverurl );
