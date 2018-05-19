#   MULIST server

**MULIST server** is a minimalist email list driven by a Web API running on a database-less Node.js app using a JSON file as data storage.

[![Build Status](https://travis-ci.org/kimihub/mulist-server.svg?branch=master)](https://travis-ci.org/kimihub/mulist-server)

## Server requirements

You need a http web server or a cloud hosting account to deploy MULIST server.

Here are the minimal requirements of the server :

- **Node.js >= 9**
- **Persistent storage** is obviously required to keep JSON file data integrity

Some Node.js modules are required in some cases :
- **crypto** support to generate an **access key**
- **https** support to handle HTTPS with Node.js

Operating system packages :
- **openssl** installed to generate Self-Signed SSL certificates if needed

## Configuration

**Environment variables** are used to configure MULIST server. You can also use `config.js` if in some cases you cannot set them.

`PORT (80 | 443 | ...)` is required and must be an integer.

`HOST` is optionnal but for some cloud hosting an IP or a name is required.

`FORCE_SSL` is optionnal. If `true`, SSL will be activated whatever the defined PORT.

`SSL_KEY` and `SSL_CERT` are optionnal. This is the path of SSL Trusted CA Signed Certificates.

`SSL_DOMAIN` is optionnal. It is used to create SSL Self-Signed Certificates.

`KEY` is optionnal and should be used only for development purpose. It disables the crypto auto-generation access key.

`DATA_PATH` is optionnal. You can define it if your persistent volume storage has a specific path.

`TITLE` is optionnal. Title string displayed as the head `<title>` and `<h1>` of the internal E-mail submitter form.

`PICTURE` is optionnal. Image link displayed as the head `<img>` of the internal E-mail submitter form.

`STYLESHEET` is optionnal. CSS stylesheet link of the internal E-mail submitter form.

`LABEL` is optionnal. Label text displayed as the form legend. Default `Email`.

`LABEL_EXISTING_EMAIL` is optionnal. Displayed when the email is existing. Default `Existing Email`.

`LABEL_SUBMIT_SUCCESS` is optionnal. Displayed when the email has been subscribed. Default `Subscribed Email`.

`LABEL_SUBMIT_FAILURE` is optionnal. Displayed when submit failure occurs . Default `Failed Subscription`.

`PLACEHOLDER` is optionnal. Placeholder input text. Default `you@example.com`.

`SUBMIT` is optionnal. Submit button name text. Default `Subscribe`.

## HTTPS

To secure the Web API with HTTPS, the common practice is to use nginx to handle SSL certificates or HTTPS support provided with cloud hosting (Heroku, Openshift ...) but you might want to use HTTPS support of Node.js.

Then activate SSL by listening the port 443 or forcing SSL with environment variables :

    PORT=443 npm start
    // or
    FORCE_SSL=true PORT=8080 npm start


You can use your own SSL Trusted CA Signed Certificates by defining their path in SSL_KEY and SSL_CERT :

    PORT=443 SSL_KEY=/etc/pathToSSL/ssl.key SSL_CERT=/etc/pathToSSL/ssl.cert npm start
    

You can also use the SSL Self-Signed Certificates generated at each startup by defining your domain in SSL_DOMAIN :

    PORT=443 SSL_DOMAIN=subdomain.domain.com npm start

## Manage Web API

You need to install **MULIST cli** on your computer to manage MULIST server : https://github.com/kimihub/mulist-cli

You also need an **access key** which is automatically generated with `crypto` at each startup and printed on the app logs like bellow :

    > Access key : <hash>
    > Listening on port <port>

You can also define it yourself with environment variables :

    KEY=myKEY npm start

## Internal E-mail submitter form

If CORS cannot be enabled on your cloud hosting, you may use the internal form by linking the url of the app : https://urlOfMyApp.com

More about CORS (Cross-origin Resource Sharing) : https://en.wikipedia.org/wiki/Cross-origin_resource_sharing

For **customization** and **styling** you can use the environment variables like bellow :

    TITLE='Email List Title' PICTURE='http://urlOfMyPicture.jpg' STYLESHEET='http://urlOfMyStylesheet.css' MAX_WIDTH=325 npm start

For the `STYLESHEET` you can use your own **classless CSS stylesheet** or prefer a **CSS framework** like [Barecss](http://barecss.com/) and [Concisecss](http://concisecss.com).

    STYLESHEET=https://cdn.jsdelivr.net/npm/concise.css/dist/concise.min.css ... npm start

Or

    STYLESHEET=https://cdn.jsdelivr.net/npm/barecss/css/bare.min.css ... npm start

## API

https://github.com/kimihub/mulist-server/blob/master/docs/api.md
