'use strict';

const config = require('./config.js');

module.exports = `<!DOCTYPE html>
<html>
<head>
<title>${config.title? config.title:''}</title>
<meta name=robots content=noindex>
<meta charset=utf-8>
<meta name=viewport content="width=device-width, initial-scale=1.0">
<style>

html {
  font-family: sans-serif;
  font-size: 0;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

body {
  background-color: white;
  margin: 40px auto;
  max-width: 90%;
  text-align: center;
}

h1 {
  color: black;
  font-size: 24px;
  margin: 50px 0;
  line-height: 1.2; 
  letter-spacing: -.1rem;
}

@media screen and (min-width: 550px) {
  h1 { font-size: 35px; }
}

input {
  color: inherit;
  display:inline-block;
  border: 1px solid;
  border-radius: 4px;
  box-shadow: none;
  box-sizing: border-box;
  font: inherit;
  height: 38px;
  line-height: normal;
  margin: 0;
}

html input[disabled] {
  cursor: default;
}

input::-moz-focus-inner {
  border: 0;
  padding: 0;
}

input[type="email"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 6px 10px;
}

input[type="email"]:focus, input[type="submit"]:hover {
  outline: 0;
}

input[type="submit"] {
  display: inline-block;
  padding: 0 30px;
  font-size: 12px;
  line-height: 38px;
  letter-spacing: .1rem;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  -webkit-appearance: button;
}

input[type="email"] {
  background-color: #FAEBD7;
  border-bottom-right-radius: 0; 
  border-top-right-radius: 0;
  border-color: transparent;
  border-right: 0 none;
  color: black;
  font-size: 15px;
}

input[type="email"]::-webkit-input-placeholder {
  color: #999;
}
input[type="email"]::-moz-placeholder {
  color: #999;
}
input[type="email"]:-ms-input-placeholder { 
  color: #999;
}
input[type="email"]:-moz-placeholder {
  color: #999;
}
input[type="email"]::placeholder {
  color: #999;
}

input[type="submit"] {
  background-color: #800080;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 35px auto;
  border-bottom-left-radius: 0;
  border-color: #800080;
  border-left: 0 none; 
  border-top-left-radius: 0;
}

.checked input[type="email"], .checked input[type="submit"] {
  color: green;
  border-color: green;
}

.error input[type="email"], .error input[type="submit"] {
  color: red;
  border-color: red;
}

.loading input[type="email"], .loading input[type="submit"] {
  background-color: #800080;
  border-color: transparent;
  color: white;
}

.checked input[type="submit"] {
  background-image: url('data:image/svg+xml;charset=utf-8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdGVkIGJ5IEljb01vb24uaW8gLS0+DQo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMDI0IiBoZWlnaHQ9IjEwMjQiIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiPg0KPGcgaWQ9Imljb21vb24taWdub3JlIj4NCjwvZz4NCjxwYXRoIGZpbGw9ImdyZWVuIiBkPSJNNjQ0LjMwOSA1MzguNTVsLTY4LjMwOS01OC41NSAxODkuNTM4LTE2Mi40NjItMjUuODQ2LTI1Ljg0Ni0yNzUuNjkyIDIzNi4zMDgtMjc1LjY5Mi0yMzYuMzA4LTI1Ljg0NiAyNS44NDYgMTg5LjUzOCAxNjIuNDYyLTE4OS41MzggMTYyLjQ2MiAyNS44NDYgMjUuODQ2IDE5MS42OTItMTY0LjMwOCA4NCA3MiA4NC03MiA3OC4xMjEgNjYuOTYxYy0xMS42NDUgMjUuOTYxLTE4LjEyMSA1NC43NDMtMTguMTIxIDg1LjAzOSAwIDI4LjM0OSA1LjY3MSA1NS4zNzMgMTUuOTQxIDgwaC00OTUuODI2Yy0zNS42NDMgMC02NC4xMTUtMjguNTY5LTY0LjExNS02My44MXYtMzg0LjM4YzAtMzUuMTg1IDI4LjcwNS02My44MSA2NC4xMTUtNjMuODFoNjcxLjc3YzM1LjY0MyAwIDY0LjExNSAyOC41NjkgNjQuMTE1IDYzLjgxdjE2NS43NTZjLTE1LjQwOS0zLjY0LTMxLjQ3OS01LjU2Ni00OC01LjU2Ni03MS4yOTYgMC0xMzQuMjE0IDM1Ljg3MS0xNzEuNjkxIDkwLjU1djAgMHpNODE2IDgzMmM5Ny4yMDIgMCAxNzYtNzguNzk4IDE3Ni0xNzZzLTc4Ljc5OC0xNzYtMTc2LTE3NmMtOTcuMjAyIDAtMTc2IDc4Ljc5OC0xNzYgMTc2czc4Ljc5OCAxNzYgMTc2IDE3NnYwek04MDAgNzQzLjc2NWwtNzUuMzE0LTc1LjMxNCAyMy40MzEtMjMuNDMxIDUxLjg4MiA1MS44ODIgOTkuODgyLTk5Ljg4MiAyMy40MzEgMjMuNDMxLTEyMy4zMTQgMTIzLjMxNHoiPjwvcGF0aD4NCjwvc3ZnPg==');
}

.error input[type="submit"] {
  background-image: url('data:image/svg+xml;charset=utf-8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdGVkIGJ5IEljb01vb24uaW8gLS0+DQo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMDI0IiBoZWlnaHQ9IjEwMjQiIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiPg0KPGcgaWQ9Imljb21vb24taWdub3JlIj4NCjwvZz4NCjxwYXRoIGZpbGw9InJlZCIgZD0iTTY4OS4wMzMgNTc2Ljg4NWwtMTEzLjAzMy05Ni44ODUgMTg5LjUzOC0xNjIuNDYyLTI1Ljg0Ni0yNS44NDYtMjc1LjY5MiAyMzYuMzA4LTI3NS42OTItMjM2LjMwOC0yNS44NDYgMjUuODQ2IDE4OS41MzggMTYyLjQ2Mi0xODkuNTM4IDE2Mi40NjIgMjUuODQ2IDI1Ljg0NiAxOTEuNjkyLTE2NC4zMDggODQgNzIgODQtNzIgMTIyLjIxOSAxMDQuNzU5LTc1LjEwOCAxMjcuMjQxaC00NjYuOTk2Yy0zNS42NDMgMC02NC4xMTUtMjguNTY5LTY0LjExNS02My44MXYtMzg0LjM4YzAtMzUuMTg1IDI4LjcwNS02My44MSA2NC4xMTUtNjMuODFoNjcxLjc3YzM1LjY0MyAwIDY0LjExNSAyOC41NjkgNjQuMTE1IDYzLjgxdjI2My43MTlsLTgwLTEzNS41MjktOTQuOTY3IDE2MC44ODV6TTc4NCA0ODBsMjA4IDM1MmgtNDE2bDIwOC0zNTJ6TTc2OCA2MDh2OTZoMzJ2LTk2aC0zMnpNNzY4IDczNnYzMmgzMnYtMzJoLTMyeiI+PC9wYXRoPg0KPC9zdmc+');
}

.add input[type="submit"], .loading input[type="submit"] {
  background-image: url('data:image/svg+xml;charset=utf-8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdGVkIGJ5IEljb01vb24uaW8gLS0+DQo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMDI0IiBoZWlnaHQ9IjEwMjQiIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiPg0KPGcgaWQ9Imljb21vb24taWdub3JlIj4NCjwvZz4NCjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik04MDAgNjcyaC05NnYtMzJoOTZ2LTk2aDMydjk2aDk2djMyaC05NnY5NmgtMzJ2LTk2ek02NDQuMzA5IDUzOC41NWwtNjguMzA5LTU4LjU1IDE4OS41MzgtMTYyLjQ2Mi0yNS44NDYtMjUuODQ2LTI3NS42OTIgMjM2LjMwOC0yNzUuNjkyLTIzNi4zMDgtMjUuODQ2IDI1Ljg0NiAxODkuNTM4IDE2Mi40NjItMTg5LjUzOCAxNjIuNDYyIDI1Ljg0NiAyNS44NDYgMTkxLjY5Mi0xNjQuMzA4IDg0IDcyIDg0LTcyIDc4LjEyMSA2Ni45NjFjLTExLjY0NSAyNS45NjEtMTguMTIxIDU0Ljc0My0xOC4xMjEgODUuMDM5IDAgMjguMzQ5IDUuNjcxIDU1LjM3MyAxNS45NDEgODBoLTQ5NS44MjZjLTM1LjY0MyAwLTY0LjExNS0yOC41NjktNjQuMTE1LTYzLjgxdi0zODQuMzhjMC0zNS4xODUgMjguNzA1LTYzLjgxIDY0LjExNS02My44MWg2NzEuNzdjMzUuNjQzIDAgNjQuMTE1IDI4LjU2OSA2NC4xMTUgNjMuODF2MTY1Ljc1NmMtMTUuNDA5LTMuNjQtMzEuNDc5LTUuNTY2LTQ4LTUuNTY2LTcxLjI5NiAwLTEzNC4yMTQgMzUuODcxLTE3MS42OTEgOTAuNTV2MCAwek04MTYgODMyYzk3LjIwMiAwIDE3Ni03OC43OTggMTc2LTE3NnMtNzguNzk4LTE3Ni0xNzYtMTc2Yy05Ny4yMDIgMC0xNzYgNzguNzk4LTE3NiAxNzZzNzguNzk4IDE3NiAxNzYgMTc2djB6Ij48L3BhdGg+DQo8L3N2Zz4=');
}

</style>
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
<h1>${config.title? config.title:''}</h1>
<form id="form" class=add>
  <input placeholder=Email type=email name=email>
  <input type=submit name=submit value=&nbsp;>
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
  form.className = 'add';
});

form.addEventListener('submit', function (event) {
  var xhr, onfail;
 
  event.preventDefault();

  if (form.email.value.trim() === '') {
    return;
  }

  form.className = 'loading';
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
      form.className = 'checked';
    } else {
      
      if (this.responseJSON.message === 'wrong email') {
        form.className = 'error';
      }
      else {
        form.className = 'checked';
      }
    }
  });

  onfail = function () {
    form.email.disabled = '';
    form.submit.disabled = '';
    form.className = 'add';
  };

  xhr.addEventListener('abort', onfail);
  xhr.addEventListener('error', onfail);
  xhr.addEventListener('timeout', onfail);
  xhr.open('POST', '/add');
  xhr.send('email=' + form.email.value);
});
</script>
</body>
</html>`;
