# Atlssian Confluence API
This project contains some Node.js modules which wraps [Atlassian's Confluence APIs.](https://developer.atlassian.com/cloud/confluence/rest/  )

## Features

This client wraps all  Confluence Cloud REST APIs with nodejs, including:

- Audit
- Content
- Group
- Longtask
- Relation
- Search
- Settings
- Space
- Template
- User

**Reference:  https://developer.atlassian.com/cloud/confluence/rest/**



## Installation

```shell
$ npm install confluence-restapi
```



## Usages

1. Define the client config, like:

   ```javascript
   var config = {
       user: "*****",
       password: "*****",
       baseUrl:  "https://******.atlassian.net/wiki/rest/api"
   };
   ```

    More config options parameters, refer to: https://www.npmjs.com/package/node-rest-client

2. Create a client instance, like:

   ```javascript
   var ConfluenceAPI = require("confluence-restapi");

   var confluenceAPI = ConfluenceAPI.create(config);
   ```

3. Call API with the above instance, like:

   ```javascript
   //demo1: get contents
   var params = {
       start : 0,
       limit : 5
   };
   confluenceAPI.content.getContent(params, function(err, data) {
       if(err){
           console.log(err);
           return;
       }
       console.log(JSON.stringify(data));
   });

   //demo2: create content
   var params = {
       status : 'current'
   };
   var request = {
       ancestors: [{
           id : "1802243"
       }],
       body: {
           "storage": {
               "value": "<p>This page was created by RESTAPI. Creator: Sam.Li</p>",
               "representation": "storage"
           }
       },
       space: {
           key : "TES"
       },
       status: "current",
       title: "This page was created at " + new Date(),
       type: "page"
   };
   confluenceAPI.content.createContent(params, request, function(err, data) {
       if(err){
           console.log(err);
           return;
       }
       console.log(JSON.stringify(data));
   });

   //demo3: get content by id
   var contentId = tempContentId;
   var params = {
       embeddedContentRender : "current",
       status: "current"
   };
   confluenceAPI.content.getContentById(contentId, params, function(err, data) {
      if(err){
           console.log(err);
           return;
       }
       console.log(JSON.stringify(data));
   });

   //demo4: update content
   var contentId = tempContentId;
   var params = {
       conflictPolicy: "abort",
       status : 'current'
   };
   var request = {
       ancestors: [{
           id : "1802243"
       }],
       body: {
           "storage": {
               "value": "<p>This page was updated by RESTAPI. Creator: Sam.Li</p><p>Updated at: " + new Date() + "</p>",
               "representation": "storage"
           }
       },
       space: {
           key : "TES"
       },
       status: "current",
       title: "This page was updated at " + new Date(),
       type: "page",
       version: {
           number: versionNum+1
       }
   };

   confluenceAPI.content.updateContent(contentId, params, request, function(err, data) {
       if(err){
           console.log(err);
           return;
       }
       console.log(JSON.stringify(data));
   });

   //demo5: search with CQL
   var params = {
       cql: "creator=admin and title ~ \"test*\"",
       limit: 10,
       start: 0
   };
   confluenceAPI.search.search(params, function(err, data) {
      if(err){
           console.log(err);
           return;
       }
       console.log(JSON.stringify(data));
   });

   //demo6: create attachment
   var contentId = "1802243";
   var params = {
       status: "current"
   };
   var attachFileName = "./attachment.txt";
   var form = {
       file : {
           value:  fs.createReadStream(attachFileName),
           options: {
               filename: attachFileName,
               contentType: 'text/plain'
           }
       },
       comment: "Create attachment",
       minorEdit: 'false'
   };

   confluenceAPI.content.createAttachment(contentId, params, form, function(err, data) {
       if(err){
           console.log(err);
           return;
       }
       console.log(JSON.stringify(data));
   });
   ```



## Lisence

Lisenced under [MIT Lisence](https://github.com/lisanlai/atlassian-confluence-api/blob/master/LICENSE)



## Contact

Email: sanlai_lee@qq.com

QQ: 1427894034
