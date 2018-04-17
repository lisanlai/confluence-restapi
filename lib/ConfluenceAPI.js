/**!
 * ConfluenceAPI - lib/ConfluenceAPI.js
 *
 * Copyright(c) Sam Li and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   Sam Li <sam.li@zoom.us> (https://github.com/lisanlai)
 */

'use strict';

/**
 * Module dependencies.
 */
const RESTFulClient = require('node-rest-client').Client;
const util = require('util'); 
const resources = require('./resources');

/**
 * Create a Confluence API client.
 * @param {Object} options
 * {
 *    //required: base wiki restful api url
 *    baseUrl: "https://example.atlassian.net/wiki/rest/api",
 *    //optional
 *    user: "admin", // basic http auth username if required 
 *    //optional
 *    password: "123", // basic http auth password if required 
 * 
 *    //optional: proxy configuration 
 *    proxy: {
 *        host: "proxy.foo.com", // proxy host 
 *        port: 8080, // proxy port 
 *        user: "ellen", // proxy username if required 
 *        password: "ripley" // proxy pass if required 
 *    },
 * 
 *    //optional: aditional connection options passed to node http.request y https.request methods  
 *    // (ie: options to connect to IIS with SSL)	 
 *    connection: {
 *        secureOptions: constants.SSL_OP_NO_TLSv1_2,
 *        ciphers: 'ECDHE-RSA-AES256-SHA:AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
 *        honorCipherOrder: true
 *    },
 *    //optional: will replace content-types used to match responses in JSON and XML parsers 
 *    mimetypes: {
 *        json: ["application/json", "application/json;charset=utf-8"],
 *        xml: ["application/xml", "application/xml;charset=utf-8"]
 *    },
 *    
 *    //optional
 *    requestConfig: {
 *        timeout: 1000, //request timeout in milliseconds 
 *        noDelay: true, //Enable/disable the Nagle algorithm 
 *        keepAlive: true, //Enable/disable keep-alive functionalityidle socket. 
 *        keepAliveDelay: 1000 //and optionally set the initial delay before the first keepalive probe is sent 
 *    },
 *    //optional
 *    responseConfig: {
 *        timeout: 1000 //response timeout 
 *    }
* }
 */
function ConfluenceAPI(options){
    
    //you can create instance without new with this statement
    //e.g. var confluenceAPI = ConfluenceAPI(options);
    if (!(this instanceof ConfluenceAPI)) {
        var confluenceAPI = new ConfluenceAPI(options);
        confluenceAPI.addResources(resources);
        return confluenceAPI;
    }

    if (!options) {
        throw new Error("ConfluenceAPI module expects a config object.");
    }else if (!options.user || ! options.password) {
        throw new Error("ConfluenceAPI module expects a config object with both a user and password.");
    }else if (!options.baseUrl) {
        throw new Error("ConfluenceAPI module expects a config object with a baseUrl.");
    }

    if (!options.mimetypes){
        //will replace content-types used to match responses in JSON and XML parsers 
        options.mimetypes={
            json: ["application/json", "application/json;charset=utf-8"],
            xml: ["application/xml", "application/xml;charset=utf-8"]
        }
    } 
    RESTFulClient.call(this, options);
    this.addResources(resources);
    this.baseUrl = options.baseUrl;
}

util.inherits(ConfluenceAPI, RESTFulClient);

/**
 * Add resources.
 * @param {Array[function]} resources 
 */
ConfluenceAPI.prototype.addResources = function (resources) {
    var client = this;
    for (var propertyName in resources) {
      var clazz = resources[propertyName];
      if (typeof clazz === 'function') {
        this[propertyName] = new clazz(client);
      } else {
        this[propertyName] = new RESTFulResource(client);
      }
    }
};

/**
 * Process callback.
 * @param {function} cb 
 * @param {Error} err
 * @param {Object} data 
 * @param {Object} res 
 */
ConfluenceAPI.prototype.processCallback = function(cb, err, data, res){
    var statusCode = res && res.statusCode;
    var statusMessage = (res && res.statusMessage) || "Unknow Error";

    if(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        return cb(err);
    }

    if(statusCode>300){
        err = new Error(statusMessage);
        err.statusCode = statusCode;
        return cb(err);
    }
    
    if(!data){
        data = {};
        data.code = statusCode;
        data.message = statusMessage;
    }

    cb(err, data);
};

/**
 * Create ConfluenceAPI instance.
 * @param {Object} options 
 */
ConfluenceAPI.create = function(options){
    var confluenceAPI = new ConfluenceAPI(options);
    return confluenceAPI;
};

module.exports = ConfluenceAPI;