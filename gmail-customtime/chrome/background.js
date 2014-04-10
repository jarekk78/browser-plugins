function genericOnClick0(info, tab) {
	chrome.tabs.executeScript(tab.id,{"allFrames":true, "file":"checkall.js"});
}

var pat = "https://mail.google.com/mail/u/0/*";
/*
var id = chrome.contextMenus.create({
	"documentUrlPatterns":[pat], 
	"title": "gmail customtime", 
	"contexts":[ "page" ] 
	});
chrome.contextMenus.create({
	"parentId":id, 
	"documentUrlPatterns":[pat], 
	"title": "test", 
	"contexts":[ "page" ], 
	"onclick": genericOnClick0
	});
*/