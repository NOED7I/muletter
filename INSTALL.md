# Install µList HTTP

## Auto Install

MuList HTTP is configured to automatically run by on the following list of cloud hosting services.

### **Openshift Online V3**

####**Requirements**
- Openshift Online V3 account

####**Deployment**
- In the console add to your project a nodejs builder

#####**Name App and Git Repository Url**

- Fill **Name** `Name of your choice` and **Git Repository URL** `https://github.com/kimihub/mulist-http`

#####**Activate https**

- Click on "Show advanced routing, build, and deployment options"
- Go to **Routing** and click on "Show options for secured routes"
- Select **Edge** for **TLS Termination**

#####**Set nodejs production env**

- Go to **Deployment Configuration**
- Add an **Environment Variable** with the **name** `NPM_CONFIG_PRODUCTION` and the value `true`

#####**Create it**

- Click on create 
- Wait 5 minutes before accessing your app deployment in the console

####**App logs**

- In the console go to the last deployment page of your app
- Logs tab

### **OpenShift Online V2 (Deprecated)**

####**Requirements**
- Openshift Online V2 account
- OpenShift Client tools `rhc`: https://developers.openshift.com/managing-your-applications/client-tools.html (since the dashboard can't allow to access to the app logs)

####**Deployment**

    rhc app-create mulist nodejs --from-code https://github.com/kimihub/mulist-http

    rhc env set NPM_CONFIG_PRODUCTION="true" -a mulist

####**App logs**

    rhc tail mulist

### **Heroku**

####**Requirements**
- Heroku account
- Dropbox account or GitHub account

####**Deployment**
- In the dashboard create a new app
- With the Dropbox account method **download** this repository and extract all the files inside of `mulist-http-master` in `Dropbox/Apps/Heroku/[yourAppName]`
- With the GitHub account method you must **fork** this repository before connecting it

####**App logs**
- In your dashboard select your app 
- More > View logs

## Manual Install : Clone, Config, Deploy

1) Clone or download this repo

2) Edit config.js :

`port (80 | 443 | ...)` is required and must be an integer. In development you can define it directly with the command `PORT=8080 npm start`.

`host` is optionnal but for some web hosting / PaaS an IP is required like Openshift Online (`process.env.OPENSHIFT_NODEJS_IP`). You can provide an empty host or simply comment it.

`https (false | true)` is optionnal. `false` or simply not defined is usually the best choice because most of web hosting / PaaS already provide https. If `true`, the app will automatically generate certificates with `openssl` and handle https. Note that openssl must be installed with this option.

`key` is optionnal and should be used only for development purpose. It disables the crypto auto-generation access key.

3) Deploy all files on OpenShift Online, Heroku.. or your own server

