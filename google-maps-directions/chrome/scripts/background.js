var maps_a_coords_gcp_input = null;

function gcp_success(position) {
  if(typeof position != 'undefined') {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	maps_a_coords_gcp_input.value = latitude+','+longitude;
  }
}

function gcp_error(err) { console.log('getCurrentPosition failed'+ err); }

/*$('.dir-m').append('<img class=\'earth-img\' src=\''+chrome.extension.getURL("/images/earth.gif")+'\'>');
$('.dir-m').click(function() {
  $(this).next().find('.kd-input-text').val("current location (2)");
  maps_a_coords_gcp_input = $( this ).next().find('.kd-input-text');
  maps_a_coords_gcp_input.val("[getting location...]");
  navigator.geolocation.getCurrentPosition( gcp_success, gcp_error);
});


$('.tactile-searchbox-input').bind("contextmenu", function(e) {        
		console.log( $('.tactile-searchbox-input') );
		$('.tactile-searchbox-input').val("123");
        return false;
    });
    

*/
function genericOnClick0(info, tab) {
  chrome.tabs.executeScript(tab.id,{"allFrames":true, file:"scripts/geo.js"});	
}

function genericOnClick1(info, tab) {
  chrome.tabs.executeScript(tab.id,{"allFrames":true, file:"scripts/geo_dest.js"});	
}

var pat = "https://www.google.com/maps/*";
var id = chrome.contextMenus.create({
	"documentUrlPatterns":[pat], 
	"title": "Google maps", 
	"contexts":[ "page" ] 
	});

chrome.contextMenus.create({
	"parentId":id, 
	"documentUrlPatterns":[pat], 
	"title": "Insert geolocation as starting point", 
	"contexts":[ "page" ], 
	"onclick": genericOnClick0
	});

chrome.contextMenus.create({
	"parentId":id, 
	"documentUrlPatterns":[pat], 
	"title": "Insert geolocation as destination", 
	"contexts":[ "page" ], 
	"onclick": genericOnClick1
	});
