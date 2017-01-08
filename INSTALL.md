# Install µList HTTP

## Auto Install

MuList HTTP is configured to automatically run by on the following list of cloud hosting services.

##### **Heroku**

######**Requirements**
- Heroku account
- Dropbox account or GitHub account

######**Deployment**
- Create a new app
- With the Dropbox account method **download** this repository and extract all the files inside of `mulist-http-master` in `Dropbox/Apps/Heroku/[yourAppName]`
- With the GitHub account method you must **fork** this repository before connecting it

######**App logs**
- In your app dashboard : More > View logs

##### **OpenShift Online V2 (Deprecated)**

######**Requirements**
- Openshift Online V2 account
- OpenShift Client tools `rhc`: https://developers.openshift.com/managing-your-applications/client-tools.html

######**Deployment**

    rhc app-create mulist nodejs --from-code https://github.com/kimihub/mulist-http

    rhc env set NPM_CONFIG_PRODUCTION="true" -a mulist

######**App logs**

    rhc tail mulist


## Manual Install : Clone, Config, Deploy

1) Clone or download this repo

2) Edit config.js :

`port (80 | 443 | ...)` is required and must be an integer. In development you can define it directly with the command `PORT=8080 npm start`.

`host` is optionnal but for some web hosting / PaaS an IP is required like Openshift Online (`process.env.OPENSHIFT_NODEJS_IP`). You can provide an empty host or simply comment it.

`https (false | true)` is optionnal. `false` or simply not defined is usually the best choice because most of web hosting / PaaS already provide https. If `true`, the app will automatically generate certificates with `openssl` and handle https. Note that openssl must be installed with this option.

`key` is optionnal and should be used only for development purpose. It disables the crypto auto-generation access key.

3) Deploy all files on OpenShift Online, Heroku, AWS.. or your own server

