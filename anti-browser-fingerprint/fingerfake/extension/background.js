
function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=");
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];

        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}

function rand( from_, to_ ) { return Math.floor( from_+Math.random()*(to_-from_+1) ); }

function applyChange( url, ch, parsed ) {
	// skip if fields not present
	var fields = ch[0];
	var i; for (i=0;i<fields.length;i++) {
		var field = fields[i];
		if (!(field in parsed)) return url;
	}
	
	// find index of actual values
	var possibleValues = ch[1];
	var matchedIndex = -1;
	for (i=0;i<possibleValues.length;i++) {
		var matches = true;
		var theseValues = possibleValues[i];
		var j; for (j=0;j<fields.length;j++) if (parsed[fields[j]]!=theseValues[j]) {
			matches=false;
			break;
		}
		if (matches) {
			matchedIndex = i;
			break;
		}
	}
	
	// select one of possibleValues
	var r = rand(1,possibleValues.length-1);
	var selectedValues = 0;
	j=0; for (i=0;i<possibleValues.length;i++) {
		if (i!=matchedIndex) j++;
		if (j==r) {
			selectedValues = i;
			break;
		}
	}
	
	for (j=0;j<fields.length;j++) url = url.replace( fields[j]+"="+parsed[fields[j]], fields[j]+"="+possibleValues[selectedValues][j] );

	return url;
}

function randomHex( len ) {
	var a = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
	var res="";
	while (res.length<len) res+=a[rand(0,15)];
	return res;
}

function removeLocalStorageValues( v ) { 
	v = v.split(','); 
	var i; for (i=0;i<v.length;i++) chrome.storage.local.remove( v[i] ); 
}
function removeCookies( theurl,v ) { 
	v = v.split(','); 
	var i; 
	for (i=0;i<v.length;i++) chrome.cookies.remove({url: theurl, name: v[i] });  
}

function makeUrlChanges( newUrl, changes ) {
	var parsed = parseURLParams(newUrl);
	if (parsed != undefined) {
		var i;
		var changed = newUrl;
		for (i = 0;i<changes.length;i++) changed = applyChange( changed, changes[i], parsed );
		if (changed != newUrl) newUrl = changed;
	}
	return newUrl;
}

(

function() {
	'use strict';

// ------------------------ SAMPLE FILTER DATA BEGINS HERE
	var filter_data = [
		{
			"site": "sample.host",
			"required_in_url": "sample_get_param=,screenx=",
			"cookies": {
    			"http://sample.host": "removed,cookies",
    			"http://another.host": "removed,cookies"
			},
			"localstorage": "removed,values",
			"url_changes": [
        			[ ["res_x","res_y"], [ ["1920","1200"], ["1600","900"] ] ],
        			[ ["timezone"], [ [-180],[-120],[-60],[0],[60],[120],[180] ] ],
        			[ ["plugin_hash"], [ [randomHex(32)] ] ],        			
        			[ ["some_value"], [ [rand(0,500)] ] ]
        		]
		}
	];
// ------------------------ SAMPLE FILTER DATA ENDS HERE


	chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
       	var newUrl = details.url;
		
		var i; for (i=0;i<filter_data.length;i++) {
			var filter = filter_data[i];
			if( newUrl.indexOf( filter.site )>=0 ) {
				var found_required_get_params = true;
				var required_in_url = ("required_in_url" in filter)?filter.required_in_url.split("," ):[];
				var j=0; for (j=0;j<required_in_url.length;j++) if (newUrl.indexOf( required_in_url[j] )<=0) { found_required_get_params = false; break; }
				if (found_required_get_params) {
					if ("cookies" in filter) for (var host in filter.cookies) removeCookies( host, filter.cookies[host] );
			        if ("localstorage" in filter) removeLocalStorageValues(filter.localstorage);
			        if ("url_changes" in filter) newUrl = makeUrlChanges( newUrl, filter.url_changes );
				}
			}
		}
        
        if (details.url != newUrl) return {redirectUrl: newUrl };
    },
    {urls: ["*://*/*"]}, ["blocking"]);

	chrome.webRequest.onBeforeSendHeaders.addListener(
        function(details) {
          for (var i = 0; i < details.requestHeaders.length; ++i) {
            if (details.requestHeaders[i].name === 'If-None-Match') {
              details.requestHeaders.splice(i, 1);
              break;
            }
          }
          return {requestHeaders: details.requestHeaders};
        },
        {urls: ["<all_urls>"]}, ["blocking", "requestHeaders"]);
})();
