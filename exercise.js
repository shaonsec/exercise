const originalWrite = Document.prototype.write;

Document.prototype.write = function(content) {
  console.log("doc.write called with:", content);
  debugger;
  return originalWrite.apply(this, arguments);
};
