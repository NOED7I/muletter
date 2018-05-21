#   MULETTER server

**MULETTER server** is a minimalist email list driven by a Web API running on a database-less Node.js app using a JSON file as data storage.

[![Build Status](https://travis-ci.org/kimihub/muletter-server.svg?branch=master)](https://travis-ci.org/kimihub/muletter-server)

## Requirements

You need a http web server or a cloud hosting account to deploy MULETTER server.

Here are the minimal requirements of the server :

- **Node.js >= 9**
- **Persistent storage** is obviously required to keep JSON file data integrity

## Getting Start

Here is a fast and simple pre-configuration before deploying MULETTER server.

1) Download the repository

2) Edit `config.js` 
    
    **HTTP configuration**

    HTTPS is activated by listening the default `HTTP_PORT` 443.

    SSL Trusted CA Signed Certificates path must be defined in `SSL_KEY` and `SSL_CERT`. If one of them are missing, SSL Self-Signed Certificates will be generate.

    Some cloud hosting may provide (Heroku, Openshift ...) a HTTPS support, in that case you only need to define the `HTTP_PORT` used by the instance.

    
    **E-Mail Submitter configuration**

    A `TITLE` or a `PICTURE` url may be defined to personalize the submitter.
    

5) **Deployment** 


## E-Mail Submitter URL
    
https://urlOfMyServer.com


## Manage Web API

You need to install **MULIST cli** on your computer to manage MULETTER server : https://github.com/kimihub/mulist-cli

You also need an **access key** which is automatically generated with `crypto` at each startup and printed on the app logs like bellow :

    > Access key : <hash>
    > Listening on port <port>


## Advanced configuration

**Environment variables** and then `config.js` are used to configure MULETTER server.

### HTTP(S)

`HTTP_PORT` (Default `443`) and required for some cloud hosting

`HTTP_HOST` required for some cloud hosting

### SSL

`FORCE_SSL` if `true` SSL will be activated whatever the defined HTTP_PORT.

`SSL_KEY` and `SSL_CERT` path of SSL Trusted CA Signed Certificates.

`SSL_DOMAIN` used to create SSL Self-Signed Certificates.

### Data Storage

`DATA_PATH` used if the persistent volume storage has a specific path.

### API Access

`ACCESS_KEY` should be used only for development purpose. It disables the crypto auto-generation access key.


### E-mail Submitter

`TITLE` displayed as the head `<title>` and `<h1>`.

`PICTURE` image link displayed as the head `<img>`.

`STYLESHEET` CSS stylesheet or **classless CSS framework** link.

`LABEL` (Default `Email`) label text displayed as the form legend.

`LABEL_EXISTING_EMAIL` (Default `Existing Email`) displayed when the email is existing.

`LABEL_SUBMIT_SUCCESS` (Default `Subscribed Email`) displayed when the email has been subscribed.

`LABEL_SUBMIT_FAILURE` (Default `Failed Subscription`) displayed when submit fails.

`PLACEHOLDER` (Default `you@example.com`) placeholder input text.

`SUBMIT` (Default `Subcribe`) submit button name text.


## API

https://github.com/kimihub/muletter-server/blob/master/docs/api.md
