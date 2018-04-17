/**!
 * ConfluenceAPI - lib/resources/user.js
 *
 * Copyright(c) Sam Li and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   Sam Li <sam.li@zoom.us> (http://github.com/lisanlai)
 */

'use strict';

/**
 * Module dependencies.
 */
var util = require('util');
var HttpMethod = require('../Httpmethod');
var RESTFulResource = require("../RESTFulResource");

/**
 * User module.
 * @param {Object} client 
 */
function User(client){
    this.constructor.super_.call(this, client);
}

util.inherits(User, RESTFulResource);

/**
 * Get user.
 * @param {Object} params
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-user-get
 *  - {String} accountId, The accountId of the user to be returned. Required, unless the username or key is specified. The accountId uniquely identifies a user across all Atlassian products.
 *  - {[String]} expand, A multi-value parameter indicating which properties of the user to expand.
 *    - operations, returns the operations that the user is allowed to do.
 *    - details.personal, returns the ‘Personal’ details in the user’s profile, like the ‘Email’ and ‘Phone’.
 *    - details.business, returns the ‘Company’ details in the user’s profile, like the ‘Position’ and ‘Department’.
 *  - {String} key, The userKey of the user to be returned. Required, unless the username or accountId is specified. The key uniquely identifies a user in a Confluence instance and does not change.
 *  - {String} username, The username of the user to be returned. Required, unless the key or accountId is specified. The username uniquely identifies a user in a Confluence instance but can change if the user is renamed.
 * @param {Function} cb, callback function 
 */
User.prototype.getUser = function(params, cb){

    var args = {
        parameters: params || {}, // this is serialized as URL parameters 
        headers: { "Accept": "application/json" } // request headers 
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getUser", this.path("/user"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getUser(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get anonymous user.
 * @param {Object} params
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-user-anonymous-get
 *  - {[String]} expand, A multi-value parameter indicating which properties of the user to expand
 *    - operations, returns the operations that the user is allowed to do
 * @param {Function} cb, callback function 
 */
User.prototype.getAnonymousUser = function(params, cb){
    var args = {
        parameters: params || {}, // this is serialized as URL parameters 
        headers: { "Accept": "application/json" } // request headers 
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getAnonymousUser", this.path("/user/anonymous"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getAnonymousUser(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get current user.
 * @param {Object} params
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-user-current-get
 *  - {[String]} expand, A multi-value parameter indicating which properties of the user to expand.
 *    - operations, returns the operations that the user is allowed to do.
 *    - details.personal, returns the ‘Personal’ details in the user’s profile, like the ‘Email’ and ‘Phone’.
 *    - details.business, returns the ‘Company’ details in the user’s profile, like the ‘Position’ and ‘Department’.
 * @param {Function} cb, callback function 
 */
User.prototype.getCurrentUser = function(params, cb){
    var args = {
        parameters: params || {}, // this is serialized as URL parameters 
        headers: { "Accept": "application/json" } // request headers 
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getCurrentUser", this.path("/user/current"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getCurrentUser(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get group memberships for user
 * @param {Object} params
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-user-memberof-get
 *  - {String} accountId, The accountId of the user to be queried. Required, unless the username or key is specified. The accountId uniquely identifies a user across all Atlassian products.
 *  - {String} key, The userKey of the user to be queried. Required, unless the username or accountId is specified. The key uniquely identifies a user in a Confluence instance and does not change.
 *  - {Integer} limit, The maximum number of groups to return per page. Note, this may be restricted by fixed system limits. Default: 200, Minimum: 0
 *  - {Integer} start, The starting index of the returned groups. Default: 0, Minimum: 0
 *  - {String} username, The username of the user to be queried. Required, unless the key or accountId is specified. The username uniquely identifies a user in a Confluence instance but can change if the user is renamed.
 * @param {Function} cb, callback function 
 */
User.prototype.getMemberships = function(params, cb){
    var args = {
        parameters: params || {}, // this is serialized as URL parameters 
        headers: { "Accept": "application/json" } // request headers 
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getMemberships", this.path("/user/memberof"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getMemberships(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get content watch status.
 * @param {String} contentId, The ID of the content to be queried for whether the specified user is watching it.
 * @param {Object} params
 *  - {String} accountId, The accountId of the user to be queried for whether they are watching the content. Only one of username, key, accountId can be used to identify the user in the request.
 *  - {String} key, The key of the user to be queried for whether they are watching the content. Only one of username, key, accountId can be used to identify the user in the request.
 *  - {String} username, The username of the user to be queried for whether they are watching the content. Only one of username, key, accountId can be used to identify the user in the request.
 * @param {Function} cb, callback function 
 */
User.prototype.getContentWatchStatus = function(contentId, params, cb){
    var args = {
        path: { "contentId": contentId },
        parameters: params || {}, // this is serialized as URL parameters 
        headers: { "Accept": "application/json" } // request headers 
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getContentWatchStatus", this.path("/user/watch/content/${contentId}"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getContentWatchStatus(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Add content watcher
 * @param {String} contentId, The ID of the content to add the watcher to.
 * @param {Object} params
 *  - {String} accountId, The accountId of the user that will be added as a watcher. Only one of username, key, accountId can be used to identify the user in the request.
 *  - {String} key, The key of the user that will be added as a watcher. Only one of username, key, accountId can be used to identify the user in the request.
 *  - {String} username, The username of the user that will be added as a watcher. Only one of username, key, accountId can be used to identify the user in the request.
 * @param {Function} cb, callback function 
 */
User.prototype.addContentWatcher = function(contentId, params, cb){
    var args = {
        path: { "contentId": contentId },
        parameters: params || {}, // this is serialized as URL parameters 
        headers: { 
            "X-Atlassian-Token" : "no-check",
            "Accept": "application/json" 
        } // request headers 
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("addContentWatcher", this.path("/user/watch/content/${contentId}"), HttpMethod.POST);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.addContentWatcher(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Remove content watcher.
 * @param {String} contentId, The ID of the content to remove the watcher from.
 * @param {Object} params
 *  - {String} accountId, The accountId of the user that will be removed as a watcher. Only one of username, key, accountId can be used to identify the user in the request.
 *  - {String} key, The key of the user that will be removed as a watcher. Only one of username, key, accountId can be used to identify the user in the request.
 *  - {String} username, The username of the user that will be removed as a watcher. Only one of username, key, accountId can be used to identify the user in the request.
 * @param {Function} cb, callback function 
 */
User.prototype.removeContentWatcher = function(contentId, params, cb){
    var args = {
        path: { "contentId": contentId },
        parameters: params || {}, // this is serialized as URL parameters 
        headers: { "Accept": "application/json" } // request headers 
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("removeContentWatcher", this.path("/user/watch/content/${contentId}"), HttpMethod.DELETE);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.removeContentWatcher(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get label watch status.
 * @param {String} labelName, The ID of the content to remove the watcher from.
 * @param {Object} params
 *  - {String} accountId, The accountId of the user to be queried for whether they are watching the label. Only one of username, key, accountId can be used to identify the user in the request.
 *  - {String} key, The key of the user to be queried for whether they are watching the label. Only one of username, key, accountId can be used to identify the user in the request.
 *  - {String} username, The username of the user to be queried for whether they are watching the label. Only one of username, key, accountId can be used to identify the user in the request.
 * @param {Function} cb, callback function 
 */
User.prototype.getLabelWatchStatus = function(labelName, params, cb){
    var args = {
        path: { "labelName": labelName },
        parameters: params || {}, // this is serialized as URL parameters 
        headers: { "Accept": "application/json" } // request headers 
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getLabelWatchStatus", this.path("/user/watch/label/${labelName}"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getLabelWatchStatus(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Add label watcher.
 * @param {String} labelName, The ID of the content to remove the watcher from.
 * @param {Object} params
 *  - {String} accountId, The accountId of the user that will be added as a watcher. Only one of username, key, accountId can be used to identify the user in the request.
 *  - {String} key, The key of the user that will be added as a watcher. Only one of username, key, accountId can be used to identify the user in the request.
 *  - {String} username, The username of the user that will be added as a watcher. Only one of username, key, accountId can be used to identify the user in the request.
 * @param {Function} cb, callback function 
 */
User.prototype.addLabelWatcher = function(labelName, params, cb){
    var args = {
        path: { "labelName": labelName },
        parameters: params || {}, // this is serialized as URL parameters 
        headers: { 
            "X-Atlassian-Token" : "no-check",
            "Accept": "application/json" 
        } // request headers  
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("addLabelWatcher", this.path("/user/watch/label/${labelName}"), HttpMethod.POST);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.addLabelWatcher(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Remove label watcher.
 * @param {String} labelName, The ID of the content to remove the watcher from.
 * @param {Object} params
 *  - {String} accountId, The accountId of the user that will be removed as a watcher. Only one of username, key, accountId can be used to identify the user in the request.
 *  - {String} key, The key of the user that will be removed as a watcher. Only one of username, key, accountId can be used to identify the user in the request.
 *  - {String} username, The username of the user that will be removed as a watcher. Only one of username, key, accountId can be used to identify the user in the request.
 * @param {Function} cb, callback function 
 */
User.prototype.removeLabelWatcher = function(labelName, params, cb){
    var args = {
        path: { "labelName": labelName },
        parameters: params || {}, // this is serialized as URL parameters 
        headers: { 
            "Accept": "application/json" 
        } // request headers  
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("removeLabelWatcher", this.path("/user/watch/label/${labelName}"), HttpMethod.DELETE);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.removeLabelWatcher(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get space watch status.
 * @param {String} spaceKey, The key of the space to be queried for whether the specified user is watching it.
 * @param {Object} params
 *  - {String} accountId, The accountId of the user to be queried for whether they are watching the space. Only one of username, key, accountId can be used to identify the user in the request.
 *  - {String} key, The key of the user to be queried for whether they are watching the space. Only one of username, key, accountId can be used to identify the user in the request.
 *  - {String} username, The username of the user to be queried for whether they are watching the space. Only one of username, key, accountId can be used to identify the user in the request.
 * @param {Function} cb, callback function 
 */
User.prototype.getSpaceWatchStatus = function(spaceKey, params, cb){
    var args = {
        path: { "spaceKey": spaceKey },
        parameters: params || {}, // this is serialized as URL parameters 
        headers: { 
            "Accept": "application/json" 
        } // request headers  
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getSpaceWatchStatus", this.path("/user/watch/space/${spaceKey}"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getSpaceWatchStatus(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Add space watcher.
 * @param {String} spaceKey, The key of the space to add the watcher to.
 * @param {Object} params
 *  - {String} accountId, The accountId of the user that will be added as a watcher. Only one of username, key, accountId can be used to identify the user in the request.
 *  - {String} key, The key of the user that will be added as a watcher. Only one of username, key, accountId can be used to identify the user in the request.
 *  - {String} username, The username of the user that will be added as a watcher. Only one of username, key, accountId can be used to identify the user in the request.
 * @param {Function} cb, callback function 
 */
User.prototype.addSpaceWatcher = function(spaceKey, params, cb){
    var args = {
        path: { "spaceKey": spaceKey },
        parameters: params || {}, // this is serialized as URL parameters 
        headers: { 
            "X-Atlassian-Token" : "no-check",
            "Accept": "application/json" 
        } // request headers  
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("addSpaceWatcher", this.path("/user/watch/space/${spaceKey}"), HttpMethod.POST);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.addSpaceWatcher(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Remove space watch
 * @param {String} spaceKey, The key of the space to remove the watcher from.
 * @param {Object} params
 *  - {String} accountId, The accountId of the user that will be removed as a watcher. Only one of username, key, accountId can be used to identify the user in the request.
 *  - {String} key, The key of the user that will be removed as a watcher. Only one of username, key, accountId can be used to identify the user in the request.
 *  - {String} username, The username of the user that will be removed as a watcher. Only one of username, key, accountId can be used to identify the user in the request.
 * @param {Function} cb, callback function 
 */
User.prototype.removeSpaceWatcher = function(spaceKey, params, cb){
    var args = {
        path: { "spaceKey": spaceKey },
        parameters: params || {}, // this is serialized as URL parameters 
        headers: { 
            "Accept": "application/json" 
        } // request headers  
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("removeSpaceWatcher", this.path("/user/watch/space/${spaceKey}"), HttpMethod.DELETE);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.removeSpaceWatcher(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

module.exports = User;