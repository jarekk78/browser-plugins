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

var currentYear = (new Date()).getFullYear();

var dateColumnCells = document.getElementsByClassName('xW xY ');

if (dateColumnCells != null) { 
  for (var i = 0; i < dateColumnCells.length; i++) { 
	var dateCell = dateColumnCells[i].childNodes[0];
    var dateInTitleArg = dateCell.getAttribute('title');

    var date = new Date(dateInTitleArg);
	var isPreviousYear = currentYear != date.getFullYear();
	
    dateCell.innerHTML = (notBoldIfPreviousYear&&isPreviousYear?'':'<b>')+formatDate( date, format )+(notBoldIfPreviousYear&&isPreviousYear?'':'</b>');
    console.log( dateInTitleArg+' -> '+formatDate( date, 'MM-dd hh:mm' )+", prevYear: "+isPreviousYear );
  }
}

console.log( 'formatDates executed at '+(new Date()) );