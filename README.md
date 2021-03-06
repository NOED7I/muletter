# MULETTER

**MULETTER** is a minimalist email list driven by a Web API running on a database-less Node.js app using a JSON file as data storage.

[![Build Status](https://travis-ci.org/kimihub/muletter.svg?branch=master)](https://travis-ci.org/kimihub/muletter)

## Requirements

You need a http web server or a cloud hosting account to deploy MULETTER.

Here are the minimal requirements of the server :

- **Node.js >= 10**
- **Persistent storage** is obviously required to keep JSON file data integrity

## Getting Start

1) Download the repository

2) Deploy on a **Openode.io FaaS serverless** and configure `./db` as the **storage area** or pre-configure the server for a classic cloud hosting, go to **Advanced server configuration**.

3) Initialize the **API access keys** :

        npm run keys

        PRIVATE_KEY : EsvLcQTcwflXbKk/1MSf3umI1gE=
        PUBLIC_KEY : hc1x0Yp3KpwzURo5YO81mtl454U=


4) Set PRIVATE_KEY, PUBLIC_KEY as environment variables on your instance and locally into `.env` file with the instance URL in order to use the commands `npm run export` and `npm run status`

5) Optionally, you may want to set a BANNER_URL as environement variable on your instance that will be displayed above the muletter.io form

## Advanced server configuration

HTTPS is activated by listening the port 443.

SSL Trusted CA Signed Certificates path must be defined. If one of them are missing, SSL Self-Signed Certificates will be generate.

Some cloud hosting may provide (Heroku, Openshift ...) a HTTPS support, in that case you only need to define the environment variable `PORT` used by the instance. 

**Environment variables** and then `server/config.js` are used to configure MULETTER server.

### HTTP(S)

`PORT` (Default `443`) and required for some cloud hosting

`HOST` required for some cloud hosting

### SSL

`FORCE_SSL` if `true` SSL will be activated whatever the defined PORT.

`SSL_KEY` and `SSL_CERT` path of SSL Trusted CA Signed Certificates.

`SSL_DOMAIN` used to create SSL Self-Signed Certificates.


## API

https://github.com/kimihub/muletter/blob/master/docs/api.md
