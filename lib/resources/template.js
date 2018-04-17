/**!
 * ConfluenceAPI - lib/resources/template.js
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
 * Template module.
 * @param {Object} client 
 */
function Template(client){
    this.constructor.super_.call(this, client);
}

util.inherits(Template, RESTFulResource);

/**
 * Create content template. Creates a new content template. Note, blueprint templates cannot be created via the REST API.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-template-post
 * @param {object} request Body parameters
 *  - {object} body, refer: https://developer.atlassian.com/cloud/confluence/rest/#/definitions/ContentBodyCreate
 *  - {string} description, A description of the new template. Max length: 255
 *  - {object} labels, Labels for the new template. refer: https://developer.atlassian.com/cloud/confluence/rest/#/definitions/Label
 *  - {string} name, The name of the new template.
 *  - {obejct} space REQUIRED. The key for the space of the new template. Only applies to space templates. If the spaceKey is not specified, the template will be created as a global template.
 *  - {string} templateType, The type of the new template. Set to page.
 * @param {function} cb 
 */
Template.prototype.createContentTemplate = function(request, cb){
    var args = {
        data: request || {},
        headers: { 
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("createContentTemplate", this.path("/template"), HttpMethod.POST);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.createContentTemplate(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Update content template. Updates a content template. Note, blueprint templates cannot be updated via the REST API.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-template-post
 * @param {object} request Body parameters
 *  - {object} body, refer: https://developer.atlassian.com/cloud/confluence/rest/#/definitions/ContentBodyCreate
 *  - {string} description, A description of the new template. Max length: 255
 *  - {object} labels, Labels for the new template. refer: https://developer.atlassian.com/cloud/confluence/rest/#/definitions/Label
 *  - {string} name, The name of the new template.
 *  - {obejct} space REQUIRED. The key for the space of the new template. Only applies to space templates. If the spaceKey is not specified, the template will be created as a global template.
 *  - {string} templateId, The ID of the template being updated.
 *  - {string} templateType, The type of the new template. Set to page.
 * @param {function} cb 
 */
Template.prototype.updateContentTemplate = function(request, cb){
    var args = {
        data: request || {},
        headers: { 
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("updateContentTemplate", this.path("/template"), HttpMethod.PUT);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.updateContentTemplate(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get content template. Returns a content template. This includes information about template, like the name, the space or blueprint that the template is in, the body of the template, and more.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-template-contentTemplateId-get
 * @param {string} contentTemplateId REQUIRED The ID of the content template to be returned.
 * @param {function} cb 
 */
Template.prototype.getContentTemplate = function(contentTemplateId, cb){
    var args = {
        path: {
            contentTemplateId: contentTemplateId
        },
        headers: { 
            "Accept": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getContentTemplate", this.path("/template/${contentTemplateId}"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getContentTemplate(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Remove template. Deletes a template. This results in different actions depending on the type of template:
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-template-contentTemplateId-delete
 * @param {string} contentTemplateId REQUIRED The ID of the template to be deleted.
 * @param {function} cb 
 */
Template.prototype.deleteContentTemplate = function(contentTemplateId, cb){
    var args = {
        path: {
            contentTemplateId: contentTemplateId
        },
        headers: { 
            "Accept": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("deleteContentTemplate", this.path("/template/${contentTemplateId}"), HttpMethod.DELETE);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.deleteContentTemplate(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get blueprint templates. Returns all templates provided by blueprints. Use this method to retrieve all global blueprint templates or all blueprint templates in a space.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-template-blueprint-get
 * @param {object} params Query parameters
 *   - {string} expand,  multi-value parameter indicating which properties of the template to expand.
 *     . body,  returns the content of the template in storage format.
 *   - {string} spaceKey, The key of the space to be queried for templates. If the spaceKey is not specified, global blueprint templates will be returned.
 *   - {integer} limit, The maximum number of templates to return per page. Note, this may be restricted by fixed system limits. Default: 25, Minimum: 0
 *   - {integer} start, The starting index of the returned templates. Default: 0, Minimum: 0
 * @param {function} cb 
 */
Template.prototype.getBlueprintTemplate = function(params, cb){
    var args = {
        parameters: params || {},
        headers: { 
            "Accept": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getBlueprintTemplate", this.path("/template/blueprint"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getBlueprintTemplate(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get content templates. Returns all content templates. Use this method to retrieve all global content templates or all content templates in a space.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-template-page-get
 * @param {object} params Query parameters
 *   - {string} expand,  multi-value parameter indicating which properties of the template to expand.
 *     . body,  returns the content of the template in storage format.
 *   - {string} spaceKey, The key of the space to be queried for templates. If the spaceKey is not specified, global blueprint templates will be returned.
 *   - {integer} limit, The maximum number of templates to return per page. Note, this may be restricted by fixed system limits. Default: 25, Minimum: 0
 *   - {integer} start, The starting index of the returned templates. Default: 0, Minimum: 0
 * @param {function} cb 
 */
Template.prototype.getContentTemplate = function(params, cb){
    var args = {
        parameters: params || {},
        headers: { 
            "Accept": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getContentTemplate", this.path("/template/page"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getContentTemplate(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};


module.exports = Template;