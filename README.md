#   µList HTTP

**MuList HTTP** is a lightweight node server to make a mailing list


## Clone, Config, Deploy

1) Clone or download this repo

2) Edit config.js :

`https (false | true)` is required. `false` is usually the best choice because most of web hosting / PaaS already provide https. If `true`, the app will automatically generate certificates with `openssl` command of the operating system.

`port (80 | 443 | ...)` is required and must be an integer. In development you can define it directly with the command `PORT=8080 npm start`. Here are some examples but every web hosting / PaaS have their specific port :
  - Openshift : `process.env.OPENSHIFT_NODEJS_PORT`
  - Heroku : `process.env.PORT`

`host` is optionnal but for some web hosting / PaaS an IP is required like Openshift (`process.env.OPENSHIFT_NODEJS_IP`). You can provide an empty host or simply comment it.

`key` is optionnal but it should be defined to secure admin requests.

3) Deploy all files on OpenShift, Heroku, AWS, your own server...


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

### Add email

**Request**

    POST  /add

**Parameters**

    {
      "email": "user@domail.com"
    }

**Return**

    {
      "data": "user@domail.com"
    }


**Errors**

**409** already exists


### Remove email

**Request**

    POST  /remove

**Parameters**

    {
      "key": "yourKey",
      "email": "user@domail.com"
    }

**Return**

    {
      "data": "user@domail.com"
    }


**Errors**

**409** does not exist


### Import mailing list

It will remove all emails older than the last export date or than the cursor parameter. Set cursor to **0** to cancel the last export.

**Request**

      POST /import

**Parameters**

    {
      "key": "yourKey",
      "cursor": "2", // not required
      "data":  "kim@gmail.com\nsam@outlook.com\nseif785@yahoo.com\n..."
    }

**Return**

    {
      "data":  "kim@gmail.com\nsam@outlook.com\nseif785@yahoo.com\n..."
    }

**Errors**

**401** Unauthorized


### Export mailing list

**Request**

      POST /export

**Parameters**

    {
      "key": "yourKey"
    }

**Return**

    {
      "data":  "kim@gmail.com\nsam@outlook.com\nseif785@yahoo.com\n..."
    }

**Errors**

**401** Unauthorized


### Empty mailing list

**Request**

      POST /empty

**Parameters**

    {
      "key": "yourKey"
    }

**Return**

    {
      "data":  ""
    }

**Errors**

**401** Unauthorized
