function hideAndZeroByClass(cls) {
	var header = document.getElementsByClassName(cls);
	for (var i=0;i<header.lenght;i++) {
		header[i].style.visibility = "hidden";
		header[i].style.position = "absolute";
		header[i].style.height = 0;
	}
}

function hideAndEmptyById(id) {
	var banner = document.getElementById(id);
	if (banner != null) {
		banner.style.visibility = "hidden";
		banner.style.position = "absolute";
		banner.innerHTML="";
	}
}

function doForChildNodes( node, doFun ) {
	var nodes = node.childNodes;
	for(var i=0; i<nodes.length; i++) {
		if (nodes[i].nodeName.toLowerCase() != '#text') doFun( nodes[i] );
		doForChildNodes( nodes[i], doFun );
	}
}

function forAllChildrenOfClass( startClass, doFun ) {
	var tm = document.getElementsByClassName( startClass );
	for (var i=0;i<tm.length;i++) {
		doFun( tm[i] );
		doForChildNodes( tm[i], doFun );
	}
}

hideAndZeroByClass( "bannerSpace" );
hideAndEmptyById( "bannerRight" );

hideAndZeroByClass( "logoSpace" );
hideAndZeroByClass( "logo" );

hideAndEmptyById( "logoRight" );

var cfix = document.getElementsByClassName("clearfix");
for (i=0;i<cfix.lenght;i++) {
	cfix[i].style.visibility = "hidden";
	cfix[i].style.position = "absolute";
}
forAllChildrenOfClass( "bannerSpace", function(e) { e.style.height="0px"; e.style.visibility = "hidden"; e.style.position = "absolute";} );

document.getElementById("page-content").style.marginTop="0px";
document.getElementById("page-header").style.height="20px";

var tm = document.getElementsByClassName("rightTop");
for (i=0;i<tm.lenght;i++) tm[i].style.height = "20px";

//forAllChildrenOfClass( "topMenu", function(e) { e.style.paddingTop="0px"; e.style.paddingBottom="0px"; e.style.height="20px"; } );

forAllChildrenOfClass( "logo", function(e) { e.style.height="0px";} );

console.log( "Wikamp content.js" );

if (0>1 && document.getElementsByClassName("headermain").length>0) {
	document.getElementsByClassName("headermain")[0].style.lineHeight=0;
	document.getElementsByClassName("headermain")[0].style.fontSize="10px";
	document.getElementById("page-header-wrapper").style.height = "20px";
}
document.getElementsByClassName("navbar")[0].style.marginTop = "0px";
document.getElementsByClassName("navbar")[0].style.top = "0px";
document.getElementsByClassName("navbar")[0].style.paddingTop = "1px";
document.getElementsByClassName("navbar")[0].style.paddingBottom = "1px";


// hide top bar
if (document.getElementsByClassName("headermain").length==0) {
	document.getElementsByClassName("region-content")[0].style.marginTop="-70px";
	document.getElementById("page-header").style.marginBottom = "-5px";
	if (document.getElementsByClassName("logoSpace").length>0) document.getElementsByClassName("logoSpace")[0].style.height = "0px";
	if (document.getElementsByClassName("topMenu").lenght>0) document.getElementsByClassName("topMenu")[0].style.visibility = "hidden";
	document.getElementById("page-header").style.position = "absolute";
	if (document.getElementsByClassName("logoSpace").length>0) document.getElementsByClassName("logoSpace")[0].style.position = "absolute";
	if (document.getElementsByClassName("topMenu").lenght>0) document.getElementsByClassName("topMenu")[0].style.position = "absolute";
}

document.getElementsByClassName("navbar")[0].style.visibility = "hidden";
document.getElementsByClassName("navbar")[0].style.position = "absolute";


document.getElementById("page-header").onmouseover = function() {
	console.log("clicked");
	document.getElementById("page-header").onmouseover = null;
	document.getElementById("page-header").style.position = "relative";
//	document.getElementById("page-header-wrapper").style.height = "30px";
	if (document.getElementsByClassName("topMenu").lenght>0) document.getElementsByClassName("topMenu")[0].style.visibility = "visible";
	document.getElementsByClassName("navbar")[0].style.visibility = "visible";

//document.getElementById("page-header").style.position = "absolute";
	if (document.getElementsByClassName("topMenu").lenght>0) document.getElementsByClassName("topMenu")[0].style.position = "relative";
	document.getElementsByClassName("navbar")[0].style.position = "relative";
};

document.getElementById("page-header-wrapper").onmouseover = function() {
	console.log("clicked");
	document.getElementById("page-header-wrapper").onmouseover = null;
	document.getElementById("page-header").style.position = "relative";
//	document.getElementById("page-header-wrapper").style.height = "30px";
	if (document.getElementsByClassName("topMenu").lenght>0) document.getElementsByClassName("topMenu")[0].style.visibility = "visible";
	document.getElementsByClassName("navbar")[0].style.visibility = "visible";

//document.getElementById("page-header").style.position = "absolute";
	if (document.getElementsByClassName("topMenu").lenght>0) document.getElementsByClassName("topMenu")[0].style.position = "relative";
	document.getElementsByClassName("navbar")[0].style.position = "relative";
};