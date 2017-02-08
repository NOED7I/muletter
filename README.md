#   µList API 

**MuList API** is a lightweight nodejs API used to build and manage a mailing list.

[![Build Status](https://travis-ci.org/kimihub/mulist-api.svg?branch=master)](https://travis-ci.org/kimihub/mulist-api)

## Server requirements

You need a http web server or a cloud hosting account to deploy MuList API.

Here are the minimal requirements of the server :

- **Node.js >= 4** build with crypto module
- **https** support
- **openssl** installed if you've chosen to handle https with Node.js

## Install

Follow the steps in : https://github.com/kimihub/mulist-api/blob/master/INSTALL.md

## Manage API

You need to install **MuList** on your computer to manage MuList API : https://github.com/kimihub/mulist

You also need an **access key** which is automatically generated with `crypto` at each startup and printed on the app logs like bellow :

    > Access key : <hash>
    > Listening on port <port>

## Internal E-mail submitter form

If CORS cannot be enabled on your cloud hosting, you may use the internal form by linking the url of the app : https://urlOfMyApp.com

More about CORS (Cross-origin Resource Sharing) : https://en.wikipedia.org/wiki/Cross-origin_resource_sharing

## CORS E-mail submitter form example

    <form id=form>
      <input placeholder=email type=email name=email>
      <input type=submit name=submit value=Send>
    </form>

    <script>
      var form = document.getElementById('#form');

      // unlock submit button on email field focus
      form.email.addEventListener('focus', function () {
        form.submit.disabled = '';
      });

      // listen submit event
      form.addEventListener('submit', function (event) {
        var xhr, onfail;
        
        // stop all event
        event.preventDefault();

        // do not send anything if email field is empty
        if (form.email.value.trim() === '') {
          return;
        }

        // lock form while request
        form.email.disabled = 'true';
        form.submit.disabled = 'true';

        xhr = new XMLHttpRequest();

        // parse response JSON
        xhr.onreadystatechange = function () {
          if(xhr.readyState === XMLHttpRequest.DONE) {
            try {
              xhr.responseJSON = JSON.parse(xhr.responseText);
            } catch(e) {
              xhr.responseJSON = null;
            }
          }
        };

        xhr.addEventListener('load', function() {
          // unlock email field
          form.email.disabled = '';

          // if the app return an error
          if (this.status !== 200) {
            alert("Error: " + this.responseJSON.message);
          }

          // if success
          if (this.responseJSON.data) {
            alert(this.responseJSON.data + ' submitted with success');
          }
        });

        // define action on failure
        onfail = function() {
          alert('Error: the request has failed');
          form.email.disabled = '';
          form.submit.disabled = '';
        };
        xhr.addEventListener('abort', onfail);
        xhr.addEventListener('error', onfail);
        xhr.addEventListener('timeout', onfail);

        // send data
        xhr.open('POST', 'https://urlOfMyServer.com/add');
        xhr.send('email=' + form.email.value);
      }

    </script>



## API

https://github.com/kimihub/mulist-api/blob/master/docs/api.md
