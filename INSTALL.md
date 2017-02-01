# Install µList API

Three steps : Clone, Config, Deploy

## Clone, Config

First of all, you need to clone or download this repo.

If you want to use the internal E-mail submitter form (for example if CORS is not enabled with your cloud hosting), you must edit `config.js` or set the environment variable "title" (`process.env.title`) during deployment and define your mailing list title (default to null).

For a dedicated server or a VPS, go to [Avanced configuration](#advanced_config) section.

## Deploy

MuList API is configured to automatically run by on the following list of cloud hosting services.

### **Openshift Online V3**

####**Requirements**
- Openshift Online V3 account

####**Deployment**
- In the console add to your project a nodejs builder

#####**Name App and Git Repository Url**

- Fill **Name** `Name of your choice` and **Git Repository URL** `https://github.com/kimihub/mulist-api`

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

####**Persistent Volume**
To keep datas after idle or restart you'll need a persistent volume and use the **Environment Variable** `datapath = pathToData/datas.json`

## <a name="advanced_config"></a> Advanced configuration (config.js)

`port (80 | 443 | ...)` is required and must be an integer. In development you can define it directly with the command `PORT=8080 npm start`.

`host` is optionnal but for some web hosting / PaaS an IP is required like Openshift Online (`process.env.OPENSHIFT_NODEJS_IP`). You can provide an empty host or simply comment it.

`https (false | true)` is optionnal. `false` or simply not defined is usually the best choice because most of web hosting / PaaS already provide https. If `true`, the app will automatically generate certificates with `openssl` and handle https. Note that openssl must be installed with this option.

`key` is optionnal and should be used only for development purpose. It disables the crypto auto-generation access key.
