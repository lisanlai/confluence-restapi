/**!
 * ConfluenceAPI - lib/resources/baseResource.js
 *
 * Copyright(c) Sam Li and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   Sam Li <sam.li@zoom.us> (http://github.com/lisanlai)
 */

'use strict';

/**
 * 
 * @param {Object} client 
 */
function RESTFulResource(client){
    this.client = client;
}

/**
 * Return api full path.
 * @param {String} apiPath 
 */
RESTFulResource.prototype.path = function(apiPath){
    return this.client.baseUrl + apiPath;
}

module.exports = RESTFulResource;