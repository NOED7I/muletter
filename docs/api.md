# µList API

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

It will remove all emails older than the last export date or than the cursor parameter. Set cursor to **0** to cancel the last export. **This route should be used only to sync a local mailing list, look at the /edit virtual route bellow**. 

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


### Edit mailing list (virtual route)

This route is the combination of two routes : /export and /import, used in order to sync a local mailing list.

1) Export

2) Edit localy

3) Import local editing with only **key** and **data** as parameters.


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
