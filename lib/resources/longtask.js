/**!
 * ConfluenceAPI - lib/resources/longtask.js
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
 * LongTask module.
 * @param {Object} client 
 */
function LongTask(client){
    this.constructor.super_.call(this, client);
}

util.inherits(LongTask, RESTFulResource);

/**
 * Get long-running tasks.
 * @param {Object} params 
 *  - {integer} limit, The maximum number of tasks to return per page. Note, this may be restricted by fixed system limits. Default: 100, Minimum: 0
 *  - {integer} start, The starting index of the returned tasks. Default: 0, Minimum: 0
 * @param {Function} cb, callback function
 */
LongTask.prototype.getLongRuningTasks = function(params, cb){
    var args = {
        parameters: params || {},
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getLongRuningTasks", this.path("/longtask"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getLongRuningTasks(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
}

/**
 * Get long-running task.
 * @param {String} taskId, The ID of the task.
 * @param {Function} cb, callback function
 */
LongTask.prototype.getLongRuningTask = function(taskId, cb){
    var args = {
        path: { "taskId": taskId },
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getLongRuningTask", this.path("/longtask/${taskId}"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getLongRuningTask(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
}

module.exports = LongTask;