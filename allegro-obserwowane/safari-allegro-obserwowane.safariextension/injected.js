function checkAllClicked( event ) {
	var elements = document.getElementsByClassName("mailInvert"), n = elements.length;
	for (var i = 0; i < n; i++) { 
    	 var e = elements[i];
	     e.checked = true;
	}
}

var e = document.getElementsByTagName("th");
for (i=0;i<e.length;i++) 
	if (e[i].innerHTML.indexOf("E-mail")>=0) {
		e[i].innerHTML="<img id='checkAllClickedId' width=12 style='margin-right: 2px;' src='"+safari.extension.baseURI+"icon16.png"+"'>"+e[i].innerHTML;
		document.getElementById('checkAllClickedId').addEventListener("click", checkAllClicked, false)
	}