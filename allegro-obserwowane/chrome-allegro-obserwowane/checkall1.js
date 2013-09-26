var elements = document.getElementsByClassName("mailInvert"), n = elements.length;
for (var i = 0; i < n; i++) { 
     var e = elements[i];
     if (!(e.parentNode.innerHTML.indexOf( " godz.")>-1)) e.checked = true;
}