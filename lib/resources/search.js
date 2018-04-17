/**!
 * ConfluenceAPI - lib/resources/search.js
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
 * Search module.
 * @param {Object} client 
 */
function Search(client){
    this.constructor.super_.call(this, client);
}

util.inherits(Search, RESTFulResource);


/**
 * Searches for content using the Confluence Query Language (CQL)
 * @param {Object} params
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-search-get
 *  - {String} cql, REQUIRED. The CQL query to be used for the search. 
 *  - {String} cqlcontext, The space, content, and content status to execute the search against.
 *    . spaceKey, Key of the space to search against. Optional.
 *    . contentId, ID of the content to search against. Optional. Must be in the space specified by spaceKey.
 *    . contentStatuses, Content statuses to search against. Optional.
 *  - {boolean} includeArchivedSpaces, Include content from archived spaces in the results. Default: false
 *  - {integer} limit, The maximum number of content objects to return per page. Note, this may be restricted by fixed system limits. Default: 25, Minimum: 0
 *  - {integer} start, The starting index of the returned content. Default: 0, Minimum: 0
 * @param {Function} cb, callback function 
 */
Search.prototype.search = function(params, cb){
    var args = {
        parameters: params || {},
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("search", this.path("/search"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.search(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
}

/**
 * Search content using keyword quickly.
 * @param {String} keyword, keyword using search for content
 * @param {Function} cb, callback function
 */
Search.prototype.quickSearch = function(keyword, cb){
    var params = {
        cql : "title ~ \""+keyword+"*\""
    };
    var args = {
        parameters: params || {},
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("quickSearch", this.path("/search"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.quickSearch(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
}

module.exports = Search;