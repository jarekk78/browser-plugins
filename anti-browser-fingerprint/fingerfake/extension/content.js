var actualCode = ['/* Code here. Example: */',
					'localStorage.removeItem("keyValFP");',
                  ' // setTimeout(function() { console.log("added?"); localStorage.removeItem("keyValFP"); }, 5000);',
                  ' // using a newline. Otherwise, missing semicolons',
                  ' //  or single-line comments (//) will mess up your',
                  ' //  code ----->'].join('\n');

var script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
script.parentNode.removeChild(script);