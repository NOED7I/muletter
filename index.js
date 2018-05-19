'use strict'

const config = require('./config.js')
const TITLE = process.env.TITLE || config.TITLE || ''
const PICTURE = process.env.PICTURE || config.PICTURE || ''
const STYLESHEET = process.env.STYLESHEET || config.STYLESHEET || ''
const LABEL = process.env.LABEL || config.LABEL || ''
const LABEL_EXISTING_EMAIL = process.env.LABEL_EXISTING_EMAIL || config.LABEL_EXISTING_EMAIL || ''
const LABEL_SUBMIT_FAILURE = process.env.LABEL_SUBMIT_FAILURE || config.LABEL_SUBMIT_FAILURE || ''
const LABEL_SUBMIT_SUCCESS = process.env.LABEL_SUBMIT_SUCCESS || config.LABEL_SUBMIT_SUCCESS || ''
const PLACEHOLDER = process.env.PLACEHOLDER || config.PLACEHOLDER || ''
const SUBMIT = process.env.SUBMIT || config.SUBMIT || ''

module.exports = `<!DOCTYPE html>
<html>
<head>
<title>${TITLE}</title>
<meta name=robots content=noindex>
<meta charset=utf-8>
<meta name=viewport content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
<style>
body, h1 {
  text-align: center;
}
h1, fieldset {
  display: inline-block;
  text-align: left;
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
      <legend><label for=email>${LABEL || 'Email'}</label></legend>
      <input id=email placeholder=${PLACEHOLDER || 'you@example.com'} type=email name=email>
      <button name=submit type=submit>${SUBMIT || 'Subscribe'}</button>
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
  form.email.labels[0].style = '';
  form.email.labels[0].innerText = '${LABEL || 'Email'}';
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
      form.email.labels[0].style = 'color: green; font-style: italic';
      form.email.labels[0].innerText = '${LABEL_SUBMIT_SUCCESS || 'Subscribed Email'}';
    } else {
      if (this.responseJSON.message === 'Existing Email') {
        form.email.style = 'color: red; border-color: red';
        form.email.labels[0].style = 'color: red; font-style: italic';
        form.email.labels[0].innerText = '${LABEL_EXISTING_EMAIL}' || this.responseJSON.message;
      }
    }
  });

  onfail = function () {
    form.email.disabled = '';
    form.submit.disabled = '';
    form.email.style = 'color: orange; border-color: orange';
    form.email.labels[0].style = 'color: orange; font-style: italic';
    form.email.labels[0].innerText = '${LABEL_SUBMIT_FAILURE || 'Failed Subscription'}';
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
