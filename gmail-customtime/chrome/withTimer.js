function timerFun( timerIdInTimersArray ) {
	var currentTime = new Date();
	console.log('timerFun at '+currentTime );

	var format = 'MM-dd hh:mm';
	var notBoldIfPreviousYear = true;

	function zeroPad(num, places) {
	  var zero = places - num.toString().length + 1;
	  return Array(+(zero > 0 && zero)).join("0") + num;
	}

	function formatDate( date, format ) {
		return format
			.replace('MM',zeroPad(date.getMonth()+1,2))
			.replace('dd',zeroPad(date.getDate(),2))
			.replace('hh',zeroPad(date.getHours(),2))
			.replace('mm',zeroPad(date.getMinutes(),2))
			;
	}

	function replaceAll( s, r ) {
		var rep = r.split(";");
		for (var i=0;i<rep.length;i++) {
			var t = rep[i].split("=");
			s = s.replace(t[0],t[1]);
		}
		return s;
	}
	
	function translateDate( s ) {
		var polish = "stycznia=jan;lutego=feb;marca=mar;kwietnia=apr;maja=may;czerwca=jun;lipca=jul;sierpnia=aug;września=sep;października=oct;listopada=nov;grudnia=dec";
		s = replaceAll( s, polish );
		s = replaceAll( s, " at = " );
		return s;
	}
	
	var currentYear = (new Date()).getFullYear();

	var dateColumnCells = document.getElementsByClassName('xW xY ');

	if (dateColumnCells != null) { 
	  var j=0,k=0;
	  for (var i = dateColumnCells.length-1; (i >=0 && k<dateColumnCells.length); i--,k++) { 
	  	if (j==1) i=k;
		var dateCell = dateColumnCells[i].childNodes[0];
		var dateInTitleArg = dateCell.getAttribute('title');
		
		var date = new Date( translateDate( dateInTitleArg ) );
		var isPreviousYear = currentYear != date.getFullYear();
		
		var newInnerHTML = (notBoldIfPreviousYear&&isPreviousYear?'':'<b>')+formatDate( date, format )+(notBoldIfPreviousYear&&isPreviousYear?'':'</b>');
//		newInnerHTML = '<div style="border:1px solid silver;background:white;width:12px;display:block;height:12px"></div>';
		if (dateCell.innerHTML != newInnerHTML)	dateCell.innerHTML = newInnerHTML;
		else {
			if (j==0) {
//				console.log("from start at "+i);
				k=-1;
				j=1;
			} else {
//				console.log("skipped at "+i);
				return;
			}
		}
	  }
	}
}

if ('timerStarted' in window.parent) {
//	console.log( 'not starting timer' );
} else {
//	console.log( 'starting timer in '+window.parent );
	window.parent.timerStarted = true;
	var timerHandle = setInterval( timerFun,2000);
}