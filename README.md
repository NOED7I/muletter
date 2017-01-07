#   µList HTTP 

**MuList HTTP** is a lightweight node server to make a mailing list

[![Build Status](https://travis-ci.org/kimihub/mulist-http.svg?branch=master)](https://travis-ci.org/kimihub/mulist-http)

## Server requirements

You need a http web server or a cloud hosting account to deploy MuList HTTP.

Here are the minimal requirements of the server :

- **Node.js >= 0.10** build with crypto module
- **https** support
- **openssl** installed if you've chosen to handle https with Node.js

## Install

Follow the steps in : https://github.com/kimihub/mulist-http/blob/master/INSTALL.md

## MuList CLI and access key

You need to install **MuList CLI** on your computer to manage MuList HTTP : https://github.com/kimihub/mulist-cli

The **access key** is automatically generated with `crypto` at each start of the app and printed on the app logs like bellow :

    > Access key : <hash>
    > Listening on port <port>

## E-mail submitter form example

    <form id=submitter>
      <input placeholder=email type=text name=email>
      <input type=submit value=Send>
    </form>

    <div id=notifications></div>

    <script>

      function xhrListener() {
          var notif = document.querySelector('#notifications');

          if (this.responseText.errors) {
            notif.innerText = "Error: " + this.responseText.errors;
          }

          if (this.responseText.data) {
            notif.innerText = this.responseText.data + " submitted with success";
          }
      }

      function formListener() {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', xhrListener);
        xhr.open('POST', 'https://urlOfMyServer.com');
        xhr.send();
      }

      document.querySelector('#submitter')
              .addEventListener('submit', formListener);

    </script>



## API

https://github.com/kimihub/mulist-http/blob/master/docs/api.md
