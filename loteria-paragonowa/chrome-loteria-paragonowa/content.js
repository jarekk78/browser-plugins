function get_NIP() {
	var nip = "";
	for (var i=1;i<11;i++) nip += document.getElementById("nip_"+i).value;
	return nip;
}

function set_NIP( nip ) {
	for (var i=1;i<11;i++) document.getElementById("nip_"+i).value = nip.substring(i-1,i);
}

function get_nr_kasy() {
	return document.getElementById("nr_kasy_1").value.toUpperCase();
}

window.onload = function() {
	document.getElementById("nr_kasy_1").addEventListener("change", function(){
		chrome.storage.sync.get( get_nr_kasy(), function (obj) {
			obj = JSON.parse(obj[get_nr_kasy() ]);
			if (!chrome.runtime.error) { 
				set_NIP(obj.val);
				document.getElementById('dzien').focus();
			}
		});
		var today = new Date();
		document.getElementById('rok').value = today.getFullYear();
		document.getElementById('miesiac').value = today.getMonth()+1;
		document.getElementById('zgoda_dane').click();
		document.getElementById('sprawdzone').click();
		document.getElementById('branza').selectedIndex = 2;
		var captcha = document.getElementById('captcha-operation').innerHTML;
		document.getElementById('captcha-input').value = eval( captcha );
	});
	
	document.forms[0].addEventListener( "submit", function() { 
		console.log("NIP("+get_nr_kasy()+")="+get_NIP());
		var jsonfile = {};
	    jsonfile[ get_nr_kasy() ] = JSON.stringify({
            'val': get_NIP()
        });
        console.log( jsonfile );
		chrome.storage.sync.set( jsonfile, function() {
			console.log('NIP saved');
   		});
		return false;
	} );

}

BCY13297830