var inputs = document.getElementsByTagName("input");
for (var i = 0; i < inputs.length; i++) {
  if (inputs[i].type == "checkbox") {
	
	// http://stackoverflow.com/questions/19469881/javascript-remove-all-event-listeners-of-specific-type
//	var el = inputs[i], elClone = el.cloneNode(true);
//	el.parentNode.replaceChild(elClone, el);
	
    inputs[i].onclick = function(){};
    inputs[i].addEventListener("click", function(event){
    	if (shift_down==0 || first_clicked==null) {
    		store_first_clicked( this );
    	} else {
    		second_clicked( this );
    	}
	});
  }
}

var shift_down = 0;
function set_shift_down( down ) { 
shift_down = down; 
console.log( "Shift: "+down );
}

var first_clicked = null;
function store_first_clicked( obj ) { 
console.log( "first-clicked: " );
	console.log( obj );
first_clicked = obj; }

function in_rect( pos, begin, end ) { 
	var rLeft = begin.left;
	var rRight = end.right;
	if (end.left<begin.left) {
		rLeft = end.left;
		rRight = begin.right;
	}
	var rTop = begin.top;
	var rBottom = end.bottom;
	if (end.bottom<begin.top) {
		rTop = end.top;
		rBottom = begin.bottom;
	}
	var queryX = (pos.left+pos.right)/2;
	var queryY = (pos.top+pos.bottom)/2;
//	console.log( "in_rect? "+queryX+","+queryY+" in "+rLeft+","+rTop+" : "+rRight+","+rBottom );
//	if (queryX >= rLeft && queryX <= rRight && queryY >= rTop && queryY <= rBottom) console.log( "true" );
	return (queryX >= rLeft && queryX <= rRight && queryY >= rTop && queryY <= rBottom);
}

// http://stackoverflow.com/questions/1916218/find-the-longest-common-starting-substring-in-a-set-of-strings
function sharedStart(array){ 
    var A= array.slice(0).sort(), 
    word1= A[0], word2= A[A.length-1], 
    L= word1.length, i= 0;
    while(i<L && word1.charAt(i)=== word2.charAt(i)) i++;
    return word1.substring(0, i);
}

function get_common_name( n1, n2 ) { return sharedStart( [n1, n2] ); }

// http://stackoverflow.com/questions/646628/how-to-check-if-a-string-startswith-another-string
if (typeof String.prototype.startsWith != 'function') { String.prototype.startsWith = function (str){ return this.indexOf(str) == 0; }; }

function probably_is_in_series( q, common ) {
	if (common.length==0) return true;
	console.log( "probably_is_in_series("+q+","+common+"): " );
	var PROB_THRESHOLD = 0.8;
	if (q.startsWith(common)) return true;
	console.log( "does not start with common part" );
	var prob = 0;
	var i; for (i=1;i<common.length-1;i++) {
		if (q.startsWith( common.substring( 0, common.length-i) )) {
			console.log( "q ("+q+") starts with ("+common.substring( 0, common.length-i)+"): "+(q.startsWith( common.substring( 0, common.length-i) )) );
			prob = 1-1.0*i/common.length;
			console.log( "prob: "+prob+" above? "+(prob>PROB_THRESHOLD) );
			if (prob>PROB_THRESHOLD) return true;
			else break;
		}
	}
	console.log( "prob not above threshold: "+prob );
	console.log( "false" );
	return false;
}

function second_clicked( obj ) {
	console.log( "second_clicked: " );
	console.log( obj );
	var rect = obj.getBoundingClientRect();
	console.log(rect.top, rect.right, rect.bottom, rect.left);
	if (first_clicked != null) {
		console.log( "first_clicked was: "+first_clicked );
		var common_name = get_common_name( first_clicked.name, obj.name );
		console.log( "common_name: "+common_name );
		for (var i = 0; i < inputs.length; i++) {
//			console.log( "? "+inputs[i].name );
			if (inputs[i].type == "checkbox" 
				&& inputs[i].disabled==false // OPTION: only enabled elements
				&& probably_is_in_series( inputs[i].name, common_name ) // OPTION: try to detect series of elements
				&& inputs[i]!=first_clicked 
//				&& inputs[i]!=obj // OPTION: set last element as first (if commented)
			) {
				if (in_rect( inputs[i].getBoundingClientRect(), first_clicked.getBoundingClientRect(), obj.getBoundingClientRect() )) {
					console.log( "checking: "+inputs[i].name );
					inputs[i].checked = first_clicked.checked;
				}
			}
		}
	}
	first_clicked = null;
}

document.addEventListener('keydown', function (e) {
	e = e || window.event;
	var charCode = typeof e.which == "number" ? e.which : e.keyCode;
	if (charCode == 16) set_shift_down( 1 );
});

document.addEventListener('keyup', function (e) {
	e = e || window.event;
	var charCode = typeof e.which == "number" ? e.which : e.keyCode;
	if (charCode == 16) set_shift_down( 0 );
});

