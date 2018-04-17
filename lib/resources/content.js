/**!
 * ConfluenceAPI - lib/resources/content.js
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
var fs = require('fs');
var request = require("request");
var HttpMethod = require('../Httpmethod');
var RESTFulResource = require("../RESTFulResource");

/**
 * Content module.
 * @param {Object} client 
 */
function Content(client){
    this.constructor.super_.call(this, client);
}

util.inherits(Content, RESTFulResource);

/**
 * Get content, returns all content in a Confluence instance.
 * @param {object} params Query parameters
 *  - {string} expand, refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-get
 *  - {integer} limit, The maximum number of content objects to return per page. Note, this may be restricted by fixed system limits. Default: 25, Minimum: 0
 *  - {string} orderby, Orders the content by a particular field. Specify the field and sort direction for this parameter, as follows: ‘fieldpath asc/desc’. For example, ‘history.createdDate desc’.
 *  - {string} postingDay, The posting date of the blog post to be returned. Required for blogpost type. Format: yyyy-mm-dd.
 *  - {string} spaceKey, The key of the space to be queried for its content.
 *  - {integer} start, The starting index of the returned content. Default: 0, Minimum: 0
 *  - {string} status, Default: current. Valid values: current trashed draft any
 *  - {string} title, The title of the page to be returned. Required for page type.
 *  - {string} trigger, If set to viewed, the request will trigger a ‘viewed’ event for the content. When this event is triggered, the page/blogpost will appear on the ‘Recently visited’ tab of the user’s Confluence dashboard. Valid values: viewed
 *  - {string} type, The type of content to return. Default: page. Valid values: page blogpost
 * @param {function} cb Callback function 
 */
Content.prototype.getContent = function(params, cb){

    var args = {
        parameters: params || {},
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getContent", this.path("/content"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getContent(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Create content, creates a new piece of content or publishes an existing draft.
 * @param {object} params Query parameters
 *  - {string} expand,  * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-post
 *  - {string} status, Filter the returned content by status. Default: current
 * @param {object} request Body parameters
 *  - {object} ancestors, The parent content of the new content. Only one parent content id can be specified.
 *  - {object} body, The body of the new content. Does not apply to attachments. Only one body format should be specified as the property for this object, e.g. storage.
 *  - {string} id, The ID of the draft content. Required when publishing a draft.
 *  - {object} space, The space that the content is being created in.
 *  - {string} status, The status of the new content. Default: current. Valid values: current trashed historical draft
 *  - {string} title, Max length: 255
 *  - {string} type, The type of the new content. Custom content types defined by apps are also supported. Valid values: page blogpost comment attachment
 * @param {function} cb Callback function
 */
Content.prototype.createContent = function(params, request, cb){

    var args = {
        parameters: params || {},
        data: request || {},
        headers: { 
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("createContent", this.path("/content"), HttpMethod.POST);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.createContent(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get content by ID, returns a single piece of content, like a page or a blog post.
 * @param {string} id The ID of the content to be returned. If you don’t know the content ID, use Get content and filter the results.
 * @param {object} params Query parameters
 *  - {string} embeddedContentRender, The version of embedded content (e.g. attachments) to render. Default: current. Valid values: current version-at-save
 *  - {string} expand, refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-get
 *  - {string} status, Filter the results to a set of content based on their status. Default: current. Valid values: current trashed draft any
 *  - {string} trigger, If set to viewed, the request will trigger a ‘viewed’ event for the content. When this event is triggered, the page/blogpost will appear on the ‘Recently visited’ tab of the user’s Confluence dashboard. Valid values: viewed
 *  - {integer} version, The version number of the content to be returned.
 * @param {function} cb Callback function 
 */
Content.prototype.getContentById = function(id, params, cb){

    var args = {
        path: {"id" : id},
        parameters: params || {},
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getContentById", this.path("/content/${id}"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getContentById(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Update content. Updates a piece of content. Use this method to update the title or body of a piece of content, change the status, change the parent page, and more.
 * @param {string} id The ID of the content to be updated.
 * @param {object} params Query parameters
 *  - {string} conflictPolicy, The action that should be taken when conflicts are discovered. Only used when publishing a draft page. Default: abort. Valid values: abort
 *  - {string} status, The updated status of the content. Default: current. Valid values: current trashed draft any
 * @param {object} request, Body parameters
 *  - {object} ancestors, The parent content of the new content. Only one parent content id can be specified.
 *  - {object} body, The body of the new content. Does not apply to attachments. Only one body format should be specified as the property for this object, e.g. storage.
 *  - {string} status, The status of the new content. Default: current. Valid values: current trashed historical draft
 *  - {string} title, Max length: 255
 *  - {string} type, The type of the new content. Custom content types defined by apps are also supported. Valid values: page blogpost comment attachment
 *  - {object} version, REQUIRED.The new version for the updated content. Set this to the current version number incremented by one, unless you are changing the status to ‘draft’ which must have a version number of 1.
 * @param {function} cb Callback function 
 */
Content.prototype.updateContent = function(id, params, request, cb){

    var args = {
        path: {"id" : id},
        parameters: params || {},
        data: request || {},
        headers: { 
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("updateContent", this.path("/content/${id}"), HttpMethod.PUT);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.updateContent(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Delete content, Moves a piece of content to the space’s trash or purges it from the trash, depending on the content’s type and status.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-delete
 * @param {string} id The ID of the content to be deleted
 * @param {object} params Query parameters
 *  - {string} status, Set this to trashed, if the content’s status is trashed and you want to purge it.
 * @param {function} cb Callback function
 */
Content.prototype.deleteContent = function(id, params, cb){
    var args = {
        path: {"id" : id},
        parameters: params || {},
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("deleteContent", this.path("/content/${id}"), HttpMethod.DELETE);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.deleteContent(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-delete
 * @param {string} id The ID of the content to be queried for its childern.
 * @param {object} params Query parameters
 *  - {string} expand, A multi-value parameter indicating which properties of the children to expand, where:
 *    . attachment, returns all attachments for the content.
 *    . comments, returns all comments for the content.
 *    . page, returns all child pages of the content.
 *  - {integer} parentVersion, The version of the parent content to retrieve children for. Currently, this only works for the latest version. Default: 0
 * @param {function} cb Callback function
 */
Content.prototype.getContentChildren = function(id, params, cb){
    var args = {
        path: {"id" : id},
        parameters: params || {},
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getContentChildren", this.path("/content/${id}/child"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getContentChildren(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get content children by type. Returns all children of a given type, for a piece of content. A piece of content has different types of child content, depending on its type.
 * @param {string} id The ID of the content to be queried for this children
 * @param {string} type The type of children to return. Valid values: page, comment, attachment
 * @param {object} params Query parameters
 *  - {string} expand, refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-child-type-get
 *  - {integer} limit, The maximum number of content to return per page. Note, this may be restricted by fixed system limits. Default: 25, Minimum: 0
 *  - {integer} parentVersion, The version of the parent content to retrieve children for. Currently, this only works for the latest version. Default: 0, Minimum: 0
 *  - {integer} start, The starting index of the returned content.
 * @param {function} cb Callback function 
 */
Content.prototype.getContentChildrenByType = function(id, type, params, cb){
    var args = {
        path: {
            "id"   : id,
            "type" : type
        },
        parameters: params || {},
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getContentChildrenByType", this.path("/content/${id}/child/${type}"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getContentChildrenByType(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get attachments, returns the attachments for a piece of content.
 * @param {string} id The ID of the content to be queried for its attachments.
 * @param {object} params Query parameters
 *  - {string} expand, refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-child-attachment-get
 *  - {string} filename, Filter the results to attachments that match the filename
 *  - {integer} limit, The maximum number of content to return per page. Note, this may be restricted by fixed system limits. Default: 25, Minimum: 0
 *  - {string} mediaType, Filter the results to attachments that match the media type
 *  - {integer} start, The starting index of the returned content.
 * @param {function} cb Callback function 
 */
Content.prototype.getAttachments = function(id, params, cb){
    var args = {
        path: {
            "id"   : id
        },
        parameters: params || {},
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getAttachments", this.path("/content/${id}/child/attachment"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getAttachments(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Create attachment, Adds an attachment to a piece of content. This method only adds a new attachment. If you want to update an existing attachment, use Create or update attachments.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-child-attachment-post
 * @param {string} id The ID of the content to add the attachment to.
 * @param {object} params Query parameters
 *  - {string} status, The status of the content that the attachment is being added to. Default: current. Valid values: current draft
 * @param {object} form Form parameters 
 *  - {string} comment, The comment for the attachment that is being added.
 *  - {file} file, REQUIRED. The relative location and name of the attachment to be added to the content.
 *  - {string} minorEdit, REQUIRED. If minorEdits is set to ‘true’, no notification email or activity stream will be generated when the attachment is added to the content.
 * @param {function} cb Callback function 
 */
Content.prototype.createAttachment = function(id, params, form, cb){

    var client = this.client;
    var options = {
        method: HttpMethod.POST,
        auth: {
            username: client.options.user,
            password: client.options.password
        }, 
        url: this.path("/content/"+id+"/child/attachment"),
        headers: { 
            "X-Atlassian-Token" : "nocheck",
            "Accept": "application/json",
            "Content-Type": "multipart/form-data"
        },
        qs: params,
        formData: form
    };

    request(options, function (error, response, body) {
        if (error) {
            client.processCallback(cb, err);
        }else{
            client.processCallback(cb, null, JSON.parse(body), response);
        }
      });
};

/**
 * Create or update attachment, Adds an attachment to a piece of content. If the attachment already exists for the content, then the attachment is updated (i.e. a new version of the attachment is created).
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-child-attachment-put
 * @param {string} id The ID of the content to add the attachment to.
 * @param {object} params Query parameters
 *  - {string} status, The status of the content that the attachment is being added to. Default: current. Valid values: current draft
 * @param {object} form Form parameters 
 *  - {string} comment, The comment for the attachment that is being added.
 *  - {file} file, REQUIRED. The relative location and name of the attachment to be added to the content.
 *  - {string} minorEdit, REQUIRED. If minorEdits is set to ‘true’, no notification email or activity stream will be generated when the attachment is added to the content.
 * @param {function} cb Callback function 
 */
Content.prototype.createOrUpdateAttachment = function(id, params, form, cb){

    var client = this.client;
    var options = {
        method: HttpMethod.PUT,
        auth: {
            username: client.options.user,
            password: client.options.password
        }, 
        url: this.path("/content/"+id+"/child/attachment"),
        headers: { 
            "X-Atlassian-Token" : "nocheck",
            "Accept": "application/json",
            "Content-Type": "multipart/form-data"
        },
        qs: params,
        formData: form
    };

    request(options, function (error, response, body) {
        if (error) {
            client.processCallback(cb, err);
        }else{
            client.processCallback(cb, null, JSON.parse(body), response);
        }
      });
};

/**
 * Update attachment properties. Updates the attachment properties, i.e. the non-binary data of an attachment like the filename, media-type, comment, and parent container.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-child-attachment-put
 * @param {string} id, REQUIRED. The ID of the content that the attachment is attached to.
 * @param {string} attachmentId, REQUIRED. The ID of the attachment to update.
 * @param {object} request Body parameters
 *  - {object} container, REQUIRED. The new content to attach the attachment to.
 *  - {string} id, The ID of the attachment to be updated.
 *  - {object} metadata, 
 *  - {string} title, The updated name of the attachment.
 *  - {string} type, Set this to attachment. Valid values: attachment
 *  - {object} version, REQUIRED.The attachment version. Set this to the current version number of the attachment. Note, the version number only needs to be incremented when updating the actual attachment, not its properties.
 * @param {function} cb Callback function 
 */
Content.prototype.updateAttachProperties = function(id, attachmentId, request, cb){

    var args = {
        path: {
            id: id,
            attachmentId: attachmentId
        },
        data: request || {},
        headers: { 
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("updateAttachProperties", this.path("/content/${id}/child/attachment/${attachmentId}"), HttpMethod.PUT);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.updateAttachProperties(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Update attachment data. Updates the binary data of an attachment, given the attachment ID, and optionally the comment and the minor edit field.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-child-attachment-attachmentId-data-post
 * @param {string} id REQUIRED The ID of the content that the attachment is attached to.
 * @param {string} attachmentId REQUIRED The ID of the attachment to update.
 * @param {object} form Form parameters 
 *  - {string} comment, The comment for the attachment that is being added.
 *  - {file} file, REQUIRED. The relative location and name of the attachment to be added to the content.
 *  - {string} minorEdit, REQUIRED. If minorEdits is set to ‘true’, no notification email or activity stream will be generated when the attachment is added to the content.
 * @param {function} cb Callback function 
 */
Content.prototype.updateAttachmentData = function(id, attachmentId, form, cb){

    var client = this.client;
    var options = {
        method: HttpMethod.PUT,
        auth: {
            username: client.options.user,
            password: client.options.password
        }, 
        url: this.path("/content/"+id+"/child/attachment/"+attachmentId+"/data"),
        headers: { 
            "X-Atlassian-Token" : "nocheck",
            "Accept": "application/json",
            "Content-Type": "multipart/form-data"
        },
        qs: params,
        formData: form
    };

    request(options, function (error, response, body) {
        if (error) {
            client.processCallback(cb, err);
        }else{
            client.processCallback(cb, null, JSON.parse(body), response);
        }
      });
};

/**
 * Get content comments, Returns the comments on a piece of content.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-child-comment-get
 * @param {string} id REQUIRED The ID of the content to be queried for its comments.
 * @param {object} params Query parameters
 *  - {string} depth, Currently, this parameter is not used. Comments are returned at the root level only.
 *  - {string} expand, A multi-value parameter indicating which properties of the attachments to expand.
 *  - {integer} limit, The maximum number of comments to return per page. Note, this may be restricted by fixed system limits. Default: 25, Minimum: 0
 *  - {integer} start, The starting index of the returned comments.
 *  - {string} location, The location of the comments in the page. Multiple locations can be specified. If no location is specified, comments from all locations are returned. Valid values: inline footer resolved
 *  - {integer} parentVersion, The version of the parent content to retrieve children for. Currently, this only works for the latest version. Default: 0, Minimum: 0
 * @param {function} cb Callback function  
 */
Content.prototype.getContentComments = function(id, params, cb){

    var args = {
        path: {id: id},
        parameters: params || {},
        headers: { 
            "Accept": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getContentComments", this.path("/content/${id}/child/comment"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getContentComments(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get content descendants. Returns a map of the descendants of a piece of content.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-descendant-get
 * @param {string} id REQUIRED The ID of the content to be queried for its comments.
 * @param {object} params Query parameters
 *  - {string} expand, A multi-value parameter indicating which properties of the attachments to expand.
 * @param {function} cb Callback function  
 */
Content.prototype.getContentDescendants = function(id, params, cb){

    var args = {
        path: {id: id},
        parameters: params || {},
        headers: { 
            "Accept": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getContentDescendantss", this.path("/content/${id}/descendant"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getContentDescendantss(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get content descendants by type. Returns all descendants of a given type, for a piece of content.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-descendant-type-get
 * @param {string} id REQUIRED The ID of the content to be queried for its comments.
 * @param {string} type REQUIRED  The type of descendants to return. Valid values: page comment attachment
 * @param {object} params Query parameters
 *  - {string} expand, A multi-value parameter indicating which properties of the attachments to expand.
 *  - {integer} start, The starting index of the returned content. Default: 0, Minimum: 0
 *  - {integer} limit, The maximum number of content to return per page. Note, this may be restricted by fixed system limits. Default: 25, Minimum: 0
 * @param {function} cb Callback function  
 */
Content.prototype.getContentDescendantsByType = function(id, type, params, cb){

    var args = {
        path: {
            id: id,
            type: type
        },
        parameters: params || {},
        headers: { 
            "Accept": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getContentDescendantsByType", this.path("/content/${id}/descendant/${type}"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getContentDescendantsByType(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get history for content. Returns the most recent update for a piece of content.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-history-get
 * @param {string} id REQUIRED The ID of the content to be queried for its history.
 * @param {object} params Query parameters
 *  - {string} expand, A multi-value parameter indicating which properties of the content history to expand.
 *      . lastUpdated returns information about the most recent update of the content, including who updated it and when it was updated.
 *      . previousVersion returns information about the update prior to the current content update. For this method, it contains the same information as lastUpdated.
 *      . contributors returns all of the users who have contributed to the content.
 *      . nextVersion This parameter is not used for this method.
 * @param {function} cb Callback function  
 */
Content.prototype.getContentHistory = function(id, params, cb){

    var args = {
        path: {
            id: id
        },
        parameters: params || {},
        headers: { 
            "Accept": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getContentHistory", this.path("/content/${id}/history"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getContentHistory(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get macro body by macro ID. Returns the body of a macro in storage format, for the given macro ID. 
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-history-version-macro-id-macroId-get
 * @param {string} id REQUIRED The ID for the content that contains the macro.
 * @param {integer} version REQUIRED The version of the content that contains the macro.
 * @param {string} macroId REQUIRED The ID of the macro. This is usually passed by the app that the macro is in. Otherwise, find the macro ID by querying the desired content and version
 * @param {function} cb Callback function  
 */
Content.prototype.getMacroBodyById = function(id, version, macroId, cb){

    var args = {
        path: {
            id: id,
            version: version,
            macroId: macroId
        },
        headers: { 
            "Accept": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getMacroBodyById", this.path("/content/${id}/history/${version}/macro/id/${macroId}"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getMacroBodyById(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get labels for content. Returns the labels on a piece of content.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-label-get
 * @param {string} id REQUIRED The ID of the content to be queried for its history.
 * @param {object} params Query parameters
 *  - {integer} limit, The maximum number of labels to return per page. Note, this may be restricted by fixed system limits. Default: 200, Minimum: 0
 *  - {integer} start, The starting index of the returned labels. Default: 0, Minimum: 0
 *  - {string} prefix, Filters the results to labels with the specified prefix. If this parameter is not specified, then labels with any prefix will be returned.
 *     . global, prefix is used by default when a user adds a label via the UI.
 *     . my, prefix can be explicitly added by a user when adding a label via the UI, e.g. ‘my:example-label’. Also, when a page is selected as a favourite, the ‘my:favourite’ label is automatically added.
 *     . team, can used when adding labels via Add labels to content but is not used in the UI.
 * @param {function} cb Callback function  
 */
Content.prototype.getContentLabels = function(id, params, cb){

    var args = {
        path: {
            id: id
        },
        parameters: params || {},
        headers: { 
            "Accept": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getContentLabels", this.path("/content/${id}/label"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getContentLabels(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Add labels to content. Adds labels to a piece of content. Does not modify the existing labels.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-label-post
 * @param {string} id REQUIRED The ID of the content that will have labels added to it.
 * @param {object} request Body parameters
 *  - {string} name, The name of the label, which will be shown in the UI.
 *  - {string} prefix, The prefix for the label. Valid values: ["global", "my", "team"]
 * @param {function} cb Callback function  
 */
Content.prototype.addLabelToContent = function(id, request, cb){

    var args = {
        path: {
            id: id
        },
        data: request || {},
        headers: { 
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("addLabelToContent", this.path("/content/${id}/label"), HttpMethod.POST);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.addLabelToContent(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Remove label from content using query parameter
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-label-delete
 * @param {string} id REQUIRED The ID of the content that the label will be removed from.
 * @param {object} params Query parameters
 *  - {string} name, The name of the label to be removed.
 * @param {function} cb Callback function  
 */
Content.prototype.removeLabelFromContentWithParam = function(id, params, cb){

    var args = {
        path: {
            id: id
        },
        parameter: params || {},
        headers: { 
            "Accept": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("removeLabelFromContentWithParam", this.path("/content/${id}/label"), HttpMethod.DELETE);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.removeLabelFromContentWithParam(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Remove label from content. Removes a label from a piece of content. 
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-label-label-delete
 * @param {string} id REQUIRED The ID of the content that the label will be removed from.
 * @param {string} label REQUIRED The name of the label to be removed.
 * @param {function} cb Callback function  
 */
Content.prototype.removeLabelFromContent = function(id, label, cb){

    var args = {
        path: {
            id: id,
            label: label
        },
        headers: { 
            "Accept": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("removeLabelFromContent", this.path("/content/${id}/label/${label}"), HttpMethod.DELETE);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.removeLabelFromContent(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get watches for page. Returns the watches for a page. A user that watches a page will receive receive notifications when the page is updated.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-notification-child-created-get
 * @param {string} id REQUIRED The ID of the content to be queried for its watches.
 * @param {object} params Query parameters
 *  - {integer} limit, The maximum number of watches to return per page. Note, this may be restricted by fixed system limits. Default: 200, Minimum: 0
 *  - {integer} start, The starting index of the returned watches. Default: 0, Minimum: 0
 * @param {function} cb Callback function 
 */
Content.prototype.getWatchesForPage = function(id, params, cb){

    var args = {
        path: {
            id: id
        },
        parameters: params || {},
        headers: { 
            "Accept": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getWatchesForPage", this.path("/content/${id}/notification/child-created"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getWatchesForPage(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get watches for space. Returns all space watches for the space that the content is in. A user that watches a space will receive receive notifications when any content in the space is updated.
 * referz; https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-notification-created-get
 * @param {string} id REQUIRED The ID of the content to be queried for its watches.
 * @param {object} params Query parameters
 *  - {integer} limit, The maximum number of watches to return per page. Note, this may be restricted by fixed system limits. Default: 200, Minimum: 0
 *  - {integer} start, The starting index of the returned watches. Default: 0, Minimum: 0
 * @param {function} cb Callback function 
 */
Content.prototype.getWatchesForSpace = function(id, params, cb){

    var args = {
        path: {
            id: id
        },
        parameters: params || {},
        headers: { 
            "Accept": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getWatchesForSpace", this.path("/content/${id}/notification/created"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getWatchesForSpace(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Copy page hierarchy. Copy page hierarchy allows the copying of an entire hierarchy of pages and their associated properties, permissions and attachments. 
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-pagehierarchy-copy-post
 * @param {string} id REQUIRED The ID of the content to be queried for its watches.
 * @param {object} request Body parameters
 *  - {boolean} copyAttachments
 *  - {boolean} copyLabels
 *  - {boolean} copyPermissions
 *  - {boolean} copyProperties
 *  - {object} destinationPageId
 *  - {object} originalPageId
 *  - {object} titleOptions
 *    - {string} prefix
 *    - {string} replace
 *    - {string} search
 * @param {function} cb Callback function 
 */
Content.prototype.copyPageHierarchy = function(id, request, cb){

    var args = {
        path: {
            id: id
        },
        data: request || {},
        headers: { 
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("copyPageHierarchy", this.path("/content/${id}/pagehierarchy/copy"), HttpMethod.POST);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.copyPageHierarchy(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};


/**
 * Get content properties. Returns the properties for a piece of content. For more information about content properties.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-property-get
 * @param {string} id REQUIRED The ID of the content to be queried for its properties.
 * @param {object} params Query parameters
 *  - {string} expand, A multi-value parameter indicating which properties of the content to expand. By default, the version object is expanded.
 *     . content, returns the content that the property is stored against.
 *     . version, returns information about the version of the property, such as the version number, when it was created, etc.
 *  - {integer} limit, The maximum number of properties to return per page. Note, this may be restricted by fixed system limits. Default: 10, Minimum: 0
 *  - {integer} start, The starting index of the returned properties.. Default: 0, Minimum: 0
 * @param {function} cb Callback function 
 */
Content.prototype.getContentProperties = function(id, params, cb){

    var args = {
        path: {
            id: id
        },
        parameters: params || {},
        headers: { 
            "Accept": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getContentProperties", this.path("/content/${id}/property"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getContentProperties(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Create content property. Creates a property for an existing piece of content. 
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-property-post
 * @param {string} id REQUIRED The ID of the content to add the property to.
 * @param {object} request Body parameters
 *  - {string} key, The key of the new property. Max length: 255
 *  - {object} value
 *    - {string} description, The value of the property. This can be empty or a complex object
 * @param {function} cb Callback function 
 */
Content.prototype.createContentProperty = function(id, request, cb){

    var args = {
        path: {
            id: id
        },
        data: request || {},
        headers: { 
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("createContentProperty", this.path("/content/${id}/property"), HttpMethod.POST);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.createContentProperty(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};


/**
 * Get content property. Returns a content property for a piece of content.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-property-key-get
 * @param {string} id REQUIRED The ID of the content to be queried for the property.
 * @param {string} key REQUIRED The key of the content property.
 * @param {object} params Query parameters
 *  - {string} expand, A multi-value parameter indicating which properties of the content to expand. By default, the version object is expanded.
 *     . content, returns the content that the property is stored against.
 *     . version returns information about the version of the property, such as the version number, when it was created, etc.
 * @param {function} cb Callback function 
 */
Content.prototype.getContentProperty = function(id, key, params, cb){

    var args = {
        path: {
            id: id,
            key: key
        },
        parameters: params || {},
        headers: { 
            "Accept": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getContentProperty", this.path("/content/${id}/property/${key}"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getContentProperty(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Create content property for key. Creates a property for an existing piece of content. 
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-property-key-post
 * @param {string} id REQUIRED The ID of the content to add the property to.
 * @param {string} key REQUIRED The key of the content property.
 * @param {object} request Body parameters
 *  - {string} key, The key of the new property. Max length: 255
 *  - {object} value
 *    - {string} description, The value of the property. This can be empty or a complex object
 * @param {function} cb Callback function 
 */
Content.prototype.createContentPropertyForKey = function(id, key, request, cb){

    var args = {
        path: {
            id: id,
            key: key
        },
        data: request || {},
        headers: { 
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("createContentPropertyForKey", this.path("/content/${id}/property/${key}"), HttpMethod.POST);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.createContentPropertyForKey(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};


/**
 * Update content property. Updates an existing content property. This method will also create a new property for a piece of content, if the property key does not exist and the property version is 1.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-property-key-put
 * @param {string} id REQUIRED The ID of the content to add the property to.
 * @param {string} key REQUIRED The key of the property.
 * @param {object} request Body parameters
 *  - {object} value
 *    - {string} description, The value of the property. This can be empty or a complex object
 *  - {object} version
 *    - {boolean} minorEdit, If `minorEdit` is set to 'true', no notification email or activity\nstream will be generated for the change.
 *    - {integer} number, REQUIRED. The new version for the updated content property. Set this to the\ncurrent version number incremented by one.
 * @param {function} cb Callback function 
 */
Content.prototype.updateContentProperty = function(id, key, request, cb){

    var args = {
        path: {
            id: id,
            key: key
        },
        data: request || {},
        headers: { 
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("updateContentProperty", this.path("/content/${id}/property/${key}"), HttpMethod.PUT);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.updateContentProperty(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};


/**
 * Delete content property. Deletes a content property. 
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-property-key-delete
 * @param {string} id REQUIRED The ID of the content to add the property to.
 * @param {string} key REQUIRED The key of the property.
 * @param {function} cb Callback function 
 */
Content.prototype.deleteContentProperty = function(id, key, cb){

    var args = {
        path: {
            id: id,
            key: key
        },
        headers: { 
            "Accept": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("deleteContentProperty", this.path("/content/${id}/property/${key}"), HttpMethod.DELETE);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.deleteContentProperty(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get restrictions. Returns the restrictions on a piece of content.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-restriction-get
 * @param {string} id REQUIRED The ID of the content to be queried for its restrictions.
 * @param {object} params Query parameters
 *   - {string} expand, A multi-value parameter indicating which properties of the content restrictions to expand. By default, the following objects are expanded: restrictions.user, restrictions.group.
 *      . restrictions.user, returns the piece of content that the restrictions are applied to.
 *      . restrictions.group, returns the piece of content that the restrictions are applied to.
 *      . content, returns the piece of content that the restrictions are applied to.
 *  - {integer} limit, The maximum number of users and the maximum number of groups, in the returned restrictions, to return per page. Note, this may be restricted by fixed system limits. Default: 100, Minimum: 0
 *  - {integer} start, The starting index of the users and groups in the returned restrictions. Default: 0, Minimum: 0
 * @param {function} cb Callback function 
 */
Content.prototype.getRestrictions = function(id, params, cb){

    var args = {
        path: {
            id: id
        },
        parameters: params || {},
        headers: { 
            "Accept": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getRestrictions", this.path("/content/${id}/restriction"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getRestrictions(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Add restrictions. Adds restrictions to a piece of content. Note, this does not change any existing restrictions on the content.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-restriction-post
 * @param {string} id REQUIRED  The ID of the content to add restrictions to.
 * @param {object} request Body parameters
 *   - {object} data, refer: https://developer.atlassian.com/cloud/confluence/rest/#/definitions/ContentRestrictionUpdate
 * @param {function} cb Callback function 
 */
Content.prototype.addRestriction = function(id, request, cb){

    var args = {
        path: {
            id: id
        },
        data: request || {},
        headers: { 
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("addRestriction", this.path("/content/${id}/restriction"), HttpMethod.POST);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.addRestriction(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Update restrictions. Updates restrictions for a piece of content. This removes the existing restrictions and replaces them with the restrictions in the request.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-restriction-put
 * @param {string} id REQUIRED  The ID of the content to update restrictions for.
 * @param {object} params Query parameters
 *   - {string} expand, A multi-value parameter indicating which properties of the content restrictions (returned in response) to expand.
 *     . restrictions.user, returns the piece of content that the restrictions are applied to. Expanded by default.
 *     . restrictions.group, returns the piece of content that the restrictions are applied to. Expanded by default.
 *     . content, returns the piece of content that the restrictions are applied to.
 * @param {object} request Body parameters
 *   - {object} data, refer: https://developer.atlassian.com/cloud/confluence/rest/#/definitions/ContentRestrictionUpdate
 * @param {function} cb Callback function 
 */
Content.prototype.updateRestriction = function(id, params, request, cb){

    var args = {
        path: {
            id: id
        },
        parameters: params || {},
        data: request || {},
        headers: { 
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("updateRestriction", this.path("/content/${id}/restriction"), HttpMethod.PUT);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.updateRestriction(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Delete restrictions. Removes all restrictions (read and update) on a piece of content.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-restriction-delete
 * @param {string} id REQUIRED The ID of the content to remove restrictions from.
 * @param {object} params Query parameters
 *   - {string} expand, A multi-value parameter indicating which properties of the content restrictions (returned in response) to expand.
 *     . restrictions.user, returns the piece of content that the restrictions are applied to. Expanded by default.
 *     . restrictions.group, returns the piece of content that the restrictions are applied to. Expanded by default.
 *     . content, returns the piece of content that the restrictions are applied to.
 * @param {function} cb Callback function 
 */
Content.prototype.deleteRestriction = function(id, params, cb){

    var args = {
        path: {
            id: id
        },
        parameters: params || {},
        headers: { 
            "Accept": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("deleteRestriction", this.path("/content/${id}/restriction"), HttpMethod.DELETE);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.deleteRestriction(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get restrictions by operation. Returns restrictions on a piece of content by operation. 
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-restriction-byOperation-get
 * @param {string} id REQUIRED The ID of the content to be queried for its restrictions.
 * @param {object} params Query parameters
 *   - {string} expand, A multi-value parameter indicating which properties of the content restrictions to expand. By default, the following objects are expanded: restrictions.user, restrictions.group.
 *      . restrictions.user, returns the piece of content that the restrictions are applied to.
 *      . restrictions.group, returns the piece of content that the restrictions are applied to.
 *      . content, returns the piece of content that the restrictions are applied to.
 * @param {function} cb Callback function 
 */
Content.prototype.getRestrictionsByOperation = function(id, params, cb){

    var args = {
        path: {
            id: id
        },
        parameters: params || {},
        headers: { 
            "Accept": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getRestrictionsByOperation", this.path("/content/${id}/restriction/byOperation"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getRestrictionsByOperation(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get restrictions for operation. Returns the restictions on a piece of content for a given operation (read or update).
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-restriction-byOperation-operationKey-get
 * @param {string} id REQUIRED The ID of the content to be queried for its restrictions.
 * @param {string} operationKey REQUIRED The operation type of the restrictions to be returned. Valid values: read update
 * @param {object} params Query parameters
 *   - {string} expand, A multi-value parameter indicating which properties of the content restrictions to expand. By default, the following objects are expanded: restrictions.user, restrictions.group.
 *      . restrictions.user, returns the piece of content that the restrictions are applied to.
 *      . restrictions.group, returns the piece of content that the restrictions are applied to.
 *      . content, returns the piece of content that the restrictions are applied to.
 *  - {integer} limit, The maximum number of users and the maximum number of groups, in the returned restrictions, to return per page. Default: 100, Minimum: 0
 *  - {integer} start, The starting index of the users and groups in the returned restrictions. Default: 0, Minimum: 0
 * @param {function} cb Callback function 
 */
Content.prototype.getRestrictionsForOperation = function(id, operationKey, params, cb){

    var args = {
        path: {
            id: id,
            operationKey: operationKey
        },
        parameters: params || {},
        headers: { 
            "Accept": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getRestrictionsForOperation", this.path("/content/${id}/restriction/byOperation/${operationKey}"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getRestrictionsForOperation(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get content restriction status for group. Returns whether the specified content restriction applies to a group. 
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-restriction-byOperation-operationKey-group-groupName-get
 * @param {string} id REQUIRED The ID of the content that the restriction applies to.
 * @param {string} operationKey REQUIRED The operation that the restriction applies to. Valid values: read update
 * @param {string} groupName REQUIRED The name of the group to be queried for whether the content restriction applies to it
 * @param {function} cb Callback function 
 */
Content.prototype.getRestrictionsStatusForGroup = function(id, operationKey,groupName, cb){

    var args = {
        path: {
            id: id,
            operationKey: operationKey,
            groupName: groupName
        },
        headers: { 
            "Accept": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getRestrictionsStatusForGroup", this.path("/content/${id}/restriction/byOperation/${operationKey}/group/${groupName}"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getRestrictionsStatusForGroup(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Add group to content restriction. Adds a group to a content restriction. That is, grant read or update permission to the group for a piece of content.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-restriction-byOperation-operationKey-group-groupName-put
 * @param {string} id REQUIRED The ID of the content that the restriction applies to.
 * @param {string} operationKey REQUIRED The operation that the restriction applies to. Valid values: read update
 * @param {string} groupName REQUIRED  The name of the group to add to the content restriction.
 * @param {function} cb Callback function 
 */
Content.prototype.addGroupToRestriction = function(id, operationKey, groupName, cb){

    var args = {
        path: {
            id: id,
            operationKey: operationKey,
            groupName: groupName
        },
        headers: { 
            "Accept": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("addGroupToRestriction", this.path("/content/${id}/restriction/byOperation/${operationKey}/group/${groupName}"), HttpMethod.PUT);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.addGroupToRestriction(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Remove group from content restriction. Removes a group from a content restriction. That is, remove read or update permission for the group for a piece of content.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-restriction-byOperation-operationKey-group-groupName-delete
 * @param {string} id REQUIRED The ID of the content that the restriction applies to.
 * @param {string} operationKey REQUIRED The operation that the restriction applies to. Valid values: read update
 * @param {string} groupName REQUIRED  The name of the group to add to the content restriction.
 * @param {function} cb Callback function 
 */
Content.prototype.removeGroupFromRestriction = function(id, operationKey, groupName, cb){

    var args = {
        path: {
            id: id,
            operationKey: operationKey,
            groupName: groupName
        },
        headers: { 
            "Accept": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("removeGroupFromRestriction", this.path("/content/${id}/restriction/byOperation/${operationKey}/group/${groupName}"), HttpMethod.DELETE);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.removeGroupFromRestriction(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get content restriction status for user. Returns whether the specified content restriction applies to a user. 
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-restriction-byOperation-operationKey-user-get
 * @param {string} id REQUIRED The ID of the content that the restriction applies to.
 * @param {string} operationKey REQUIRED The operation that the restriction applies to. Valid values: read update
 * @param {object} params Query parameters
 *   - {string} accountId, The account ID of the user to be queried for whether the content restriction applies to it.
 *   - {string} key, The key of the user to be queried for whether the content restriction applies to it.
 *   - {string} userName, The username of the user to be queried for whether the content restriction applies to it.
 * @param {function} cb Callback function 
 */
Content.prototype.getRestrictionsStatusForUser = function(id, operationKey, params, cb){

    var args = {
        path: {
            id: id,
            operationKey: operationKey
        },
        parameters: params || {},
        headers: { 
            "Accept": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getRestrictionsStatusForUser", this.path("/content/${id}/restriction/byOperation/${operationKey}/user"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getRestrictionsStatusForUser(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Add user to content restriction. Adds a user to a content restriction. That is, grant read or update permission to the user for a piece of content.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-restriction-byOperation-operationKey-user-put
 * @param {string} id REQUIRED The ID of the content that the restriction applies to.
 * @param {string} operationKey REQUIRED The operation that the restriction applies to. Valid values: read update
 * @param {object} params Query parameters
 *   - {string} accountId, The account ID of the user to be queried for whether the content restriction applies to it.
 *   - {string} key, The key of the user to be queried for whether the content restriction applies to it.
 *   - {string} userName, The username of the user to be queried for whether the content restriction applies to it.
 * @param {function} cb Callback function 
 */
Content.prototype.addUserToRestriction = function(id, operationKey, params, cb){

    var args = {
        path: {
            id: id,
            operationKey: operationKey
        },
        parameters: params || {},
        headers: { 
            "Accept": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("addUserToRestriction", this.path("/content/${id}/restriction/byOperation/${operationKey}/user"), HttpMethod.PUT);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.addUserToRestriction(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};


/**
 * Remove user from content restriction. Removes a group from a content restriction. That is, remove read or update permission for the group for a piece of content.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-restriction-byOperation-operationKey-user-delete
 * @param {string} id REQUIRED The ID of the content that the restriction applies to.
 * @param {string} operationKey REQUIRED The operation that the restriction applies to. Valid values: read update
 * @param {object} params Query parameters
 *   - {string} accountId, The account ID of the user to remove from the content restriction.
 *   - {string} key, The key of the user to remove from the content restriction.
 *   - {string} userName, TThe username of the user to remove from the content restriction.
 * @param {function} cb Callback function 
 */
Content.prototype.removeUserFromRestriction = function(id, operationKey, params, cb){

    var args = {
        path: {
            id: id,
            operationKey: operationKey
        },
        parameters: params || {},
        headers: { 
            "Accept": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("removeUserFromRestriction", this.path("/content/${id}/restriction/byOperation/${operationKey}/user"), HttpMethod.DELETE);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.removeUserFromRestriction(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get content versions. Returns the versions for a piece of content in descending order.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-version-get
 * @param {string} id REQUIRED The ID of the content to be queried for its versions.
 * @param {object} params Query parameters
 *   - {string} expand, A multi-value parameter indicating which properties of the content to expand.
 *      . collaborators, returns the users that collaborated on the version.
 *      . content, returns the content for the version.
 *   - {integer} limit, The maximum number of versions to return per page. Note, this may be restricted by fixed system limits. Default: 200, Minimum: 0
 *   - {integer} start, The starting index of the returned versions. Default: 0, Minimum: 0
 * @param {function} cb Callback function 
 */
Content.prototype.getContentVersions = function(id, params, cb){

    var args = {
        path: {
            id: id
        },
        parameters: params || {},
        headers: { 
            "Accept": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getContentVersions", this.path("/content/${id}/version"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getContentVersions(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Restore content version. Restores a historical version to be the latest version. That is, a new version is created with the content of the historical version.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-version-post
 * @param {string} id REQUIRED The ID of the content to be queried for its versions.
 * @param {object} params Query parameters
 *   - {string} expand, A multi-value parameter indicating which properties of the content to expand.
 *      . collaborators, returns the users that collaborated on the version.
 *      . content, returns the content for the version.
 * @param {object} request Body parameters
 *   - {string} operationKey Set to ‘RESTORE’. Valid values: RESTORE
 *   - {object} params
 *      - {string} message, required. Description for the version.
 *      - {integer} versionNumber, required. The version number to be restored.
 * @param {function} cb Callback function 
 */
Content.prototype.restoreContentVersion = function(id, params, request, cb){

    var args = {
        path: {
            id: id
        },
        parameters: params || {},
        data: request || {},
        headers: { 
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("restoreContentVersion", this.path("/content/${id}/version"), HttpMethod.POST);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.restoreContentVersion(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get content version. Returns a version for a piece of content.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-version-versionNumber-get
 * @param {string} id REQUIRED The ID of the content to be queried for its versions.
 * @param {string} versionNumber REQUIRED The number of the version to be retrieved.
 * @param {object} params Query parameters
 *   - {string} expand, A multi-value parameter indicating which properties of the content to expand. By default, the content object is expanded.
 *      . collaborators, returns the users that collaborated on the version.
 *      . content, returns the content for the version.
 * @param {function} cb Callback function 
 */
Content.prototype.getContentVersion = function(id, versionNumber, params, cb){

    var args = {
        path: {
            id: id,
            versionNumber: versionNumber
        },
        parameters: params || {},
        headers: { 
            "Accept": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getContentVersion", this.path("/content/${id}/version/${versionNumber}"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getContentVersion(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Delete content version. Delete a historical version. This does not delete the changes made to the content in that version, rather the changes for the deleted version are rolled up into the next version. Note, you cannot delete the current version.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-id-version-versionNumber-delete
 * @param {string} id REQUIRED The ID of the content that the version will be deleted from.
 * @param {string} versionNumber REQUIRED The number of the version to be deleted. The version number starts from 1 up to current version.
 * @param {function} cb Callback function 
 */
Content.prototype.deleteContentVersion = function(id, versionNumber, cb){

    var args = {
        path: {
            id: id,
            versionNumber: versionNumber
        },
        headers: { 
            "Accept": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("deleteContentVersion", this.path("/content/${id}/version/${versionNumber}"), HttpMethod.DELETE);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.deleteContentVersion(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Publish legacy draft. Publishes a legacy draft of a page created from a blueprint. Legacy drafts will eventually be removed in favour of shared drafts. 
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-blueprint-instance-draftId-post
 * @param {string} draftId REQUIRED The ID of the draft page that was created from a blueprint. 
 * @param {object} params  Query parameters
 *   - {string} expand, refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-blueprint-instance-draftId-post
 *   - {string} status, The status of the content to be updated, i.e. the draft. This is set to ‘draft’ by default, so you shouldn’t need to specify it. Default: draft
 * @param {object} request  Body parameters
 *   - {object} ancestors, The new ancestor (i.e. parent page) for the content. 
 *     - {string} id, required. The content ID of the ancestor.
 *   - {object} space REQUIRED The space for the content.
 *     - {string} key, required. The key of the space
 *   - {string} The status of the content. Set this to current or omit it altogether. Default: current
 *   - {string} title, The title of the content. If you don’t want to change the title, set this to the current title of the draft.
 *   - {string} type, The type of content. Set this to page. Valid values: page
 *   - {object} version REQUIRED  The version for the new content.
 *     - {integer} number, required. The version number. Set this to `1`.
 * @param {function} cb Callback function 
 */
Content.prototype.publishLegacyDraft = function(draftId, params, request, cb){
    var args = {
        path: {
            draftId: draftId
        },
        parameters: params || {},
        data: request || {},
        headers: { 
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("publishLegacyDraft", this.path("/content/blueprint/instance/${draftId}"), HttpMethod.POST);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.publishLegacyDraft(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Publish shared draft. Publishes a shared draft of a page created from a blueprint.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-blueprint-instance-draftId-put
 * @param {string} draftId REQUIRED The ID of the draft page that was created from a blueprint. You can find the draftId in the Confluence application by opening the draft page and checking the page URL.
 * @param {object} params  Query parameters
 *   - {string} expand, refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-blueprint-instance-draftId-post
 *   - {string} status, The status of the content to be updated, i.e. the draft. This is set to ‘draft’ by default, so you shouldn’t need to specify it.
 * @param {object} request  Body parameters
 *   - {object} ancestors, The new ancestor (i.e. parent page) for the content. 
 *     - {string} id, required. The content ID of the ancestor.
 *   - {object} space REQUIRED The space for the content.
 *     - {string} key, required. The key of the space
 *   - {string} The status of the content. Set this to current or omit it altogether. Default: current
 *   - {string} title, The title of the content. If you don’t want to change the title, set this to the current title of the draft.
 *   - {string} type, The type of content. Set this to page. Valid values: page
 *   - {object} version REQUIRED  The version for the new content.
 *     - {integer} number, required. The version number. Set this to `1`.
 * @param {function} cb Callback function 
 */
Content.prototype.publishSharedDraft = function(draftId, params, request, cb){
    var args = {
        path: {
            draftId: draftId
        },
        parameters: params || {},
        data: request || {},
        headers: { 
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("publishSharedDraft", this.path("/content/blueprint/instance/${draftId}"), HttpMethod.PUT);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.publishSharedDraft(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Search content by CQL. Returns the list of content that matches a Confluence Query Language (CQL) query. 
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-search-get
 * @param {object} params Query parameters
 *   - {string} cql, The CQL string that is used to find the requested content.
 *   - {string} cqlcontext, The space, content, and content status to execute the search against. Specify this as an object with the following properties:
 *      . spaceKey, Key of the space to search against. Optional.
 *      . contentId, ID of the content to search against. Optional. Must be in the space spacified by spaceKey.
 *      . contentStatuses, Content statuses to search against. Optional.
 *   - {string} expand, refer: https://developer.atlassian.com/cloud/confluence/rest/#api-content-search-get
 *   - {integer} limit, The maximum number of content objects to return per page. Note, this may be restricted by fixed system limits. Default: 25, Minimum: 0
 *   - {integer} start, The starting index of the returned content. Default: 0, Minimum: 0
 * @param {function} cb Callback function
 */
Content.prototype.searchContentByCQL = function(params, cb){
    var args = {
        parameters: params || {},
        headers: { 
            "Accept": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("searchContentByCQL", this.path("/content/search"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.searchContentByCQL(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
}

module.exports = Content;