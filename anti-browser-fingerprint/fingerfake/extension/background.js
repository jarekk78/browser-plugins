
function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") {
        return;
    }

	console.log( "Parsing:"+url );

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=");
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) {
            parms[n] = [];
        }

        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}

function rand( from_, to_ ) {
	return Math.floor( from_+Math.random()*(to_-from_+1) );
}

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
	
//	console.log( "matchedIndex = "+matchedIndex );
//	console.log( "selected = "+selectedValues+" of=[0,"+(possibleValues.length-1)+"]" );
	
	// replace old with selected
	for (j=0;j<fields.length;j++) {
		console.log( "replace: "+fields[j]+"="+parsed[fields[j]]+" -> "+fields[j]+"="+possibleValues[selectedValues][j] );
		url = url.replace( fields[j]+"="+parsed[fields[j]], fields[j]+"="+possibleValues[selectedValues][j] );
	}
	
	return url;
}

function randomHex( len ) {
	var a = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
	var res="";
	while (res.length<len) res+=a[rand(0,15)];
	return res;
}

(

function() {
	'use strict';

	site1 = "DATA REMOVED - CONTACT AUTHOR FOR INFORMATION";
	site2 = "DATA REMOVED - CONTACT AUTHOR FOR INFORMATION";
	site3 = "DATA REMOVED - CONTACT AUTHOR FOR INFORMATION";
	
	webtrends = "http://webtrends."+site1;
	
	chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
       	var newUrl = details.url;
/*       	if (details.url.indexOf( "http://www.telegraph.co.uk/subscriptions/invitation-intl/" )>=0) {
       		newUrl = "http://s.telegraph.co.uk/toolbar/images/logoU.png";
       	} */
    	if (details.url.indexOf( site1+"/" )>0 ) {
    		console.log( newUrl );
    		var cookieList = [
    			[webtrends,"ACOOKIE"],
    			["http://"+site1,"WT_FPC"],
    			["http://www."+site1,"WT_FPC"],
    			["http://www."+site1,"JSESSIONID"],
    			["http://www."+site1,"_polar_tu"],
    			["http://"+site1,"mmcore.pd"],
    			["http://"+site1,"mmcore.srv"],
    			["http://"+site1,"mmcore.tst"],
    			["http://"+site1,"mmid"],
    			["http://"+site1,"tmg_authz_session"],
    			["http://"+site1,"tmg_subs_referer"],
    			["http://."+site1,"tmg_web_trends"],
				["http://."+site1,"optimizelyBuckets"],
				["http://."+site1,"optimizelyEndUserId"],
				["http://."+site1,"optimizelySegments"],
				["http://."+site1,"parsely_uuid"]
    		];
    		var i; for (i=0;i<cookieList.length;i++) 
	    		chrome.cookies.remove({url:cookieList[i][0], name: cookieList[i][1] }); 
	    		
    	}
        if( details.url.indexOf( "testusiowo" )>0 ) {
    		console.log( ">>> "+details.url );
    	} 
        if( details.url.indexOf( site3 )>0 && details.url.indexOf( "sx=" )>0 && details.url.indexOf( "tmz=" )>0) {
        	// change this to derive url from request
	        chrome.cookies.remove({url:"http://"+site2, name: site3+"visitkey" }); 
	        chrome.cookies.remove({url:"http://mp."+site3+"."+site2, name: "ns_hid" }); 
	        chrome.cookies.remove({url:"http://mp."+site3+"."+site2, name: "ns_hid_cc" }); 
	        chrome.cookies.remove({url:"http://www."+site2, name: "firstvisit" }); 
	        chrome.cookies.remove({url:"http://www."+site2, name: "keyValFP" }); 
	        chrome.cookies.remove({url:"http://www."+site2, name: site3+"_referer_bar" }); 
	        chrome.storage.local.remove("keyValFP");
        	var parsed = parseURLParams(newUrl);
        	if (parsed != undefined) {
        		var changes = [
        			[
        				["sx","sy"],
        				[
        					["1920","1200"],
        					["1600","900"]
        				]
        			],
        			[
        				["cd"],
        				[
        					["8"],
        					["16"],
        					["24"],
        					["32"]
        				]
        			],
        			[ ["tmz"], [ [-180],[-120],[-60],[0],[60],[120],[180] ] ],
        			[ ["flv"], [ ["12.0"],["13.0"],["_"] ] ],
        			[ ["wmp"], [ ["10.0"],["9.0"],["_"] ] ],
        			[ ["qt"], [ ["7.7.1"],["7.7.2"],["_"] ] ],        			
        			[ ["pc"], [ [1],[2],[3],[4],[5],[6],[7],[0] ] ],
        			[ ["bl"], [ ["en-US"],["de-at"] ] ],
        			[ ["dmn"], [ ["0"],["1"] ] ],
        			[ ["adckie"], [ ["0"],["1"] ] ],        			
        			[ ["geo"], [ ["0"],["1"] ] ],        			
        			[ ["plm"], [ ["MacIntel"],["Win32"] ] ],        			
        			[ ["mt"], [ [randomHex(32)] ] ],        			
        			[ ["plg"], [ [randomHex(32)] ] ],    
        			[ ["fch"], [ [randomHex(32)] ] ],    
        			[ ["ffh"], [ [randomHex(32)] ] ],    
        			[ ["ffc"], [ [rand(0,500)] ] ],    
        			[ ["hid_f"], [ [randomHex(32)] ] ],    
        			[ ["hid_l"], [ [randomHex(32)] ] ],    
        			[ ["hid_i"], [ [randomHex(32)] ] ],    
        			[ ["hid_p"], [ [randomHex(32)] ] ]
//        			[ ["hid_cs"], [ [randomHex(32)] ] ]
        		];
        		
        		var i;
        		var changed = newUrl;
        		for (i = 0;i<changes.length;i++) changed = applyChange( changed, changes[i], parsed );
        		if (changed != newUrl) {
        			newUrl = changed;
        			console.log( newUrl );
        		}
        	}
        }
        if (details.url != newUrl) return {redirectUrl: newUrl };
    },
    {urls: ["*://*/*"]},
    ["blocking"]);
    
/*    chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
		var mappingKey = 'nl.sjmulder.urlrewrite.mappings';
		var mappings = JSON.parse(localStorage[mappingKey] || '[]');

		for (var i = 0; i < mappings.length; i++) {
			var mapping = mappings[i];
			if (details.url.indexOf(mapping.sourceUrl) == 0) {
				var newUrl = mapping.destinationUrl + details.url.slice(mapping.sourceUrl.length);
				// console.log('rewriting', details.url, 'to', newUrl);
				
				chrome.tabs.update(details.tabId, { url: newUrl })
				break;
			}
		}
	}); */

})();
