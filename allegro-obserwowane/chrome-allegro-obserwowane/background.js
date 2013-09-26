function genericOnClick0(info, tab) {
	chrome.tabs.executeScript(tab.id,{"allFrames":true, "file":"checkall.js"});
}
function genericOnClick1(info, tab) {
	chrome.tabs.executeScript(tab.id,{"allFrames":true, "file":"checkall1.js"});
}
function genericOnClick2(info, tab) {
	chrome.tabs.executeScript(tab.id,{"allFrames":true, "file":"checkall2.js"});
}

var pat = "http://allegro.pl/myaccount/watch.php*";
var id = chrome.contextMenus.create({
	"documentUrlPatterns":[pat], 
	"title": "Allegro - obserwowane", 
	"contexts":[ "page" ] 
	});
chrome.contextMenus.create({
	"parentId":id, 
	"documentUrlPatterns":[pat], 
	"title": "e-mail: zaznacz wszystkie", 
	"contexts":[ "page" ], 
	"onclick": genericOnClick0
	});
chrome.contextMenus.create({
	"parentId":id, 
	"documentUrlPatterns":[pat], 
	"title": "e-mail: zaznacz bez powiadomień", 
	"contexts":[ "page" ], 
	"onclick": genericOnClick1
	});
chrome.contextMenus.create({
	"parentId":id, 
	"documentUrlPatterns":[pat], 
	"title": "odznacz wszystkie", 
	"contexts":[ "page" ], 
	"onclick": genericOnClick2
	});
