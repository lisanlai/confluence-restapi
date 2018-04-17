/**!
 * ConfluenceAPI - lib/resources/group.js
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
 * Group module.
 * @param {Object} client 
 */
function Group(client){
    this.constructor.super_.call(this, client);
}

util.inherits(Group, RESTFulResource);

/**
 * Get groups.
 * @param {Object} params
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-group-get
 *  - {Integer} limit, The maximum number of groups to return per page. Note, this may be restricted by fixed system limits. Default: 200, Minimum: 0
 *  - {Integer} start, The starting index of the returned groups. Default: 0, Minimum: 0
 * @param {Function} cb, callback function 
 */
Group.prototype.getGroups = function(params, cb){

    var args = {
        parameters: params || {},
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getGroups", this.path("/group"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getGroups(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get group.
 * @param {Object} params
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-group-groupName-get
 *  - {String} groupName, The name of the group. This is the same as the group name shown in the Confluence administration console.
 * @param {Function} cb, callback function 
 */
Group.prototype.getGroup = function(groupName, cb){

    var args = {
        path: { "groupName": groupName },
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getGroup", this.path("/group/${groupName}"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getGroup(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get group members.
 * @param {String} groupName, The name of the group to be queried for its members.
 * @param {Object} params
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-group-get
 *  - {Integer} limit, The maximum number of groups to return per page. Note, this may be restricted by fixed system limits. Default: 200, Minimum: 0
 *  - {Integer} start, The starting index of the returned groups. Default: 0, Minimum: 0
 * @param {Function} cb, callback function 
 */
Group.prototype.getGroupMembers = function(groupName, params, cb){

    var args = {
        path: { "groupName": groupName },
        parameters: params || {},
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getGroupMembers", this.path("/group/${groupName}/member"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getGroupMembers(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

module.exports = Group;