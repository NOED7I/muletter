'use strict'

const config = require('./config.js')
const TITLE = process.env.TITLE || config.TITLE || ''
const PICTURE = process.env.PICTURE || config.PICTURE || ''
const STYLESHEET = process.env.STYLESHEET || config.STYLESHEET || ''
const MAX_WIDTH = process.env.MAX_WIDTH || config.MAX_WIDTH || ''

module.exports = `<!DOCTYPE html>
<html>
<head>
<title>${TITLE}</title>
<meta name=robots content=noindex>
<meta charset=utf-8>
<meta name=viewport content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
<style>
body {
  margin: 0 auto !important;
}
h1 {
  text-align: center;
}
body, fieldset, img {
  max-width: ${MAX_WIDTH || '320px'} !important;
}
@media all and (max-width: 300px) {
  input, button, img {
    width: 100%;
  }
}
</style>
${STYLESHEET && `<link rel=stylesheet href=${STYLESHEET}>`}
<!--[if IE]>
<style>
#form {
  display: none;
}
#ie {
  font-size: 13px;
}
</style>
<![endif]-->
</head>
<body>
  ${PICTURE ? `<h1><img src=${PICTURE}></h1>` : TITLE && `<h1>${TITLE}</h1>`}
  <form id=form method=post>
    <fieldset>
      <legend><label for=email>Email</label></legend>
      <input id=email placeholder=you@example.com type=email name=email>
      <button name=submit type="submit">Subscribe</button>
    </fiedlset>
  </form>
  <!--[if IE]>
  <div id="ie">
    <p>Your web browser is outdated.</p>
    <a href="http://outdatedbrowser.com">http://outdatedbrowser.com</a>
  </div>
  <![endif]-->
<script>
var form = document.getElementById('form');

form.email.addEventListener('focus', function () {
  form.submit.disabled = '';
  form.email.style = '';
});

form.addEventListener('submit', function (event) {
  var xhr, onfail;

  event.preventDefault();

  if (form.email.value.trim() === '') {
    return;
  }

  form.email.disabled = true;
  form.submit.disabled = true;

  xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if(xhr.readyState === XMLHttpRequest.DONE) {
      try {
        xhr.responseJSON = JSON.parse(xhr.responseText);
      } catch(e) {
        xhr.responseJSON = null;
      }
    }
  };

  xhr.addEventListener('load', function () {
    form.email.disabled = '';
    if (this.status === 200) {
      form.email.style = 'color: green; border-color: green';
      alert('Subscribed');
    } else {
      form.email.style = 'color: red; border-color: red';
      alert(this.status + ' Error ' + this.responseJSON.message);
    }
  });

  onfail = function () {
    form.email.disabled = '';
    form.submit.disabled = '';
    form.email.style = 'color: orange; border-color: orange';
    alert('Failed');
  };

  xhr.addEventListener('abort', onfail);
  xhr.addEventListener('error', onfail);
  xhr.addEventListener('timeout', onfail);
  xhr.open('POST', '/add');
  xhr.send('email=' + form.email.value);
});
</script>
</body>
</html>`
