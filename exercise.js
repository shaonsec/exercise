document.body.innerHTML = "https://cdn.jsdelivr.net/gh/shaonsec/exercise/exercise.js";
fetch("https://cdn.jsdelivr.net/gh/shaonsec/exercise/exercise.js")
  .then(res => res.text())
  .then(data => {
    console.log(data);       // prints in console
    document.body.innerText = data; // prints on page
  });
