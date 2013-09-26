function emailZaznaczWszystkie( event ) {
	var elements = document.getElementsByClassName("mailInvert"), n = elements.length;
	console.log( "elements.length = "+n );
	var query = event.userInfo;
	console.log( query );
	for (var i = 0; i < n; i++) { 
	     var e = elements[i];
    	 e.checked = true;
	}
	console.log( safari.application.activeBrowserWindow.activeTab );
}

function performCommand(event) {
	if (event.command == "emailZaznaczWszystkie") emailZaznaczWszystkie( event );
}

safari.application.addEventListener("command", performCommand, false);
console.log( "allegro obserwowane init" );