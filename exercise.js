console.log(document.domain);
parent.postMessage({
  type: "poc",
  payload: "hello from sandbox"
}, "*");
