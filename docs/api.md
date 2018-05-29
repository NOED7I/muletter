# MULETTER API
### Add email

**Request**

    POST  /subscribers


**Headers**

    Authorization Basic public-key
    

**Parameters**

    {
      "email": "user@provider.com"
    }

**Return**

    {
      "data": "user@provider.com"
    }


**Errors**

**401** Unauthorized

**409** Wrong Email


### Remove email

**Request**

    DELETE  /subscribers

**Headers**

    Authorization Basic public-key

**Parameters**

    {
      "email": "user@provider.com"
    }

**Return**

    {
      "data": "user@provider.com"
    }


**Errors**

**401** Unauthorized

**409** Wrong Email


### Import mailing list

It will remove all existing emails and replace them with the emails parameter.

**Request**

      PUT /subscribers

**Headers**

    Authorization Basic private-key

**Parameters**

    {
      "import":  "user1@provider.io\nuser2@provider.io\nuser3@provider.io\n..."
    }

**Return**

    {
      "data":  "user1@provider.io\nuser2@provider.io\nuser3@provider.io\n..."
    }

**Errors**

**401** Unauthorized

**204** No Content

**409** Wrong Cursor


### Export mailing list

**Request**

        GET /subscribers

**Headers**

    Authorization Basic private-key

**Return**

    {
      "emails":  "user1@provider.io\nuser2@provider.io\nuser3@provider.io\n..."
    }

**Errors**

**401** Unauthorized


### BCC Sender

**Request**

      POST /sender

**Headers**

    Authorization Basic private-key

**Parameters**

    {
      "service": "service-name",
      "user": "smtp-user-email",
      "password": "smtp-user-password", // used if token is not provided
      "token": "oauth2-token": // OAuth 2 token
      "body": "letter-body",
      "test": "true | false" // used for tests
    }

**Return**

    {
      "data": {}
    }

**Errors**

**409** Conflict

**401** Unauthorized


### Get Status Infos

**Request**

      GET /status

**Headers**

    Authorization Basic private-key

**Return**

    {
      "data":  {
          "count": "nb-subscribers",
          "keys": {
              "public": "public-key",
              "private": "private-key"
          },
          "version": "muletter-version"
      }
    }

**Errors**

**409** Conflict

**401** Unauthorized