/**!
 * ConfluenceAPI - lib/resources/space.js
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
 * Space module.
 * @param {Object} client 
 */
function Space(client){
    this.constructor.super_.call(this, client);
}

util.inherits(Space, RESTFulResource);

/**
 * Get spaces. Returns all spaces. The returned spaces are ordered alphabetically in ascending order by space key.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-space-get
 * @param {Object} params
 *  - {string} expand, A multi-value parameter indicating which properties of the spaces to expand
 *  - {boolean} favourite, Filter the results to the favourite spaces of the user specified by favouriteUserKey. Note, ‘favourite’ spaces are also known as ‘saved for later’ spaces.
 *  - {string} favouriteUserKey, The userKey of the user, whose favourite spaces are used to filter the results when using the favourite parameter.
 *  - {string} lable, Filter the results to spaces based on their label.
 *  - {Integer} limit, The maximum number of groups to return per page. Note, this may be restricted by fixed system limits. Default: 200, Minimum: 0
 *  - {Integer} start, The starting index of the returned spaces. Default: 0, Minimum: 0
 *  - {string} spaceKey, The key of the space to be returned. To return multiple spaces, specify this parameter multiple times with different values.
 *  - {string} status, Filter the results to spaces based on their status. Valid values: current archived
 *  - {string} type, Filter the results to spaces based on their type. Valid values: global personal
 * @param {Function} cb, callback function 
 */
Space.prototype.getSpaces = function(params, cb){

    var args = {
        parameters: params || {},
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getSpaces", this.path("/space"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getSpaces(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Create space. Creates a new space. Note, currently you cannot set space labels when creating a space.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-space-post
 * @param {Object} request
 *  - {object} description
 *    - {object} plain, required. The description of the new/updated space. Note, only the 'plain' representation \ncan be used for the description when creating or updating a space.
 *       - {string} representation, Set to 'plain'
 *       - {string} value, The space description.
 *  - {string} key, The key for the new space.
 *  - {string} name, The name of the new space. Max length: 200
 *  - {object} permissions, The permissions for the new space. If no permissions are provided, the Confluence default space permissions are applied
 *    - refer : https://developer.atlassian.com/cloud/confluence/rest/#/definitions/SpacePermission
 * @param {Function} cb, callback function 
 */
Space.prototype.createSpace = function(request, cb){

    var args = {
        data: request || {},
        headers: { 
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("createSpace", this.path("/space"), HttpMethod.POST);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.createSpace(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Create private space. Creates a new space that is only visible to the creator. 
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-space-private-post
 * @param {Object} request
 *  - {object} description
 *    - {object} plain, required. The description of the new/updated space. Note, only the 'plain' representation \ncan be used for the description when creating or updating a space.
 *       - {string} representation, Set to 'plain'
 *       - {string} value, The space description.
 *  - {string} key, The key for the new space.
 *  - {string} name, The name of the new space. Max length: 200
 * @param {Function} cb, callback function 
 */
Space.prototype.createPrivateSpace = function(request, cb){

    var args = {
        data: request || {},
        headers: { 
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("createPrivateSpace", this.path("/space/_private"), HttpMethod.POST);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.createPrivateSpace(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get space. Returns a space. This includes information like the name, description, and permissions, but not the content in the space.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-space-get
 * @param {string} spaceKey REQUIRED  The key of the space to be returned.
 * @param {Object} params
 *  - {string} expand, A multi-value parameter indicating which properties of the space to expand, where:
 *    . settings returns the settings for the space, similar to Get space settings.
 *    . metadata.labels returns the space labels, which are used to categorize the space.
 *    . operations returns the operations for a space, which are used when setting permissions.
 *    . lookAndFeel returns information about the look and feel of the space, like the color scheme.
 *    . permissions returns the permissions for the space.
 *    . icon returns information about space icon.
 *    . description.plain returns the description of the space.
 *    . description.view returns the description of the space.
 *    . theme returns information about the space theme.
 *    . homepage returns information about the space homepage.
 * @param {Function} cb, callback function 
 */
Space.prototype.getSpace = function(spaceKey, params, cb){

    var args = {
        path: {
            spaceKey: spaceKey
        },
        parameters: params || {},
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getSpace", this.path("/space/${spaceKey}"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getSpace(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Update space. Updates the name, description, or homepage of a space.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-space-spaceKey-put
 * @param {string} spaceKey REQUIRED  The key of the space to update.
 * @param {Object} request Body parameters
 *  - {object} description, refer: https://developer.atlassian.com/cloud/confluence/rest/#/definitions/SpaceDescriptionCreate
 *    - {object} plain, required. The description of the new/updated space. Note, only the 'plain' representation \ncan be used for the description when creating or updating a space.
 *       - {string} representation, Set to 'plain'
 *       - {string} value, The space description. 
 * - {object} homepage, REQUIRED. The page to set as the homepage of the space.
 *    - {string} id, required. The ID of the page.
 *  - {string} name, The name of the space. Max length: 200
 * @param {Function} cb, callback function 
 */
Space.prototype.updateSpace = function(spaceKey, request, cb){

    var args = {
        path: {
            spaceKey: spaceKey
        },
        data: request || {},
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("updateSpace", this.path("/space/${spaceKey}"), HttpMethod.PUT);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.updateSpace(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};


/**
 * Delete space. Deletes a space. Note, the space will be deleted in a long running task. 
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-space-spaceKey-delete
 * @param {string} spaceKey REQUIRED  The key of the space to delete.
 * @param {Function} cb, callback function 
 */
Space.prototype.deleteSpace = function(spaceKey, cb){

    var args = {
        path: {
            spaceKey: spaceKey
        },
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("deleteSpace", this.path("/space/${spaceKey}"), HttpMethod.DELETE);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.deleteSpace(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get content for space. Returns all content in a space. The returned content is grouped by type (pages then blogposts), then ordered by content ID in ascending order.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-space-spaceKey-content-get
 * @param {string} spaceKey REQUIRED  The key of the space to be queried for its content.
 * @param {Object} params
 *  - {string} depth, Filter the results to content at the root level of the space or all content. Default: all Valid values: all root
 *  - {string} expand, A multi-value parameter indicating which properties of the content to expand,
 *  - {integer} limit, The maximum number of content objects to return per page. Note, this may be restricted by fixed system limits. Default: 25, Minimum: 0
 *  - {integer} start, The starting index of the returned content. Default: 0, Minimum: 0
 * @param {Function} cb, callback function 
 */
Space.prototype.getContentForSpace = function(spaceKey, params, cb){

    var args = {
        path: {
            spaceKey: spaceKey
        },
        parameters: params || {},
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getContentForSpace", this.path("/space/${spaceKey}/content"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getContentForSpace(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get content by type for space. Returns all content of a given type, in a space. The returned content is ordered by content ID in ascending order.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-space-spaceKey-content-type-get
 * @param {string} spaceKey REQUIRED The key of the space to be queried for its content.
 * @param {string} type REQUIRED The type of content to return. Valid values: page blogpost
 * @param {Object} params
 *  - {string} depth, Filter the results to content at the root level of the space or all content. Default: all Valid values: all root
 *  - {string} expand, A multi-value parameter indicating which properties of the content to expand,
 *  - {integer} limit, The maximum number of content objects to return per page. Note, this may be restricted by fixed system limits. Default: 25, Minimum: 0
 *  - {integer} start, The starting index of the returned content. Default: 0, Minimum: 0
 * @param {Function} cb, callback function 
 */
Space.prototype.getContentForSpaceByType = function(spaceKey, type, params, cb){

    var args = {
        path: {
            spaceKey: spaceKey,
            type: type
        },
        parameters: params || {},
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getContentForSpaceByType", this.path("/space/${spaceKey}/content/${type}"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getContentForSpaceByType(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get space properties. Returns all properties for the given space. Space properties are a key-value storage associated with a space.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-space-spaceKey-property-get
 * @param {string} spaceKey REQUIRED The key of the space to be queried for its properties.
 * @param {Object} params Query parameters
 *  - {string} expand, A multi-value parameter indicating which properties of the space property to expand. By default, the version object is expanded.
 *    . version, returns information about the version of the content.
 *    . space, returns the space that the properties are in.
 *  - {integer} limit, The maximum number of properties to return per page. Note, this may be restricted by fixed system limits. Default: 10, Minimum: 0
 *  - {integer} start, The starting index of the returned objects. Default: 0, Minimum: 0
 * @param {Function} cb, callback function 
 */
Space.prototype.getSpaceProperties = function(spaceKey, params, cb){

    var args = {
        path: {
            spaceKey: spaceKey
        },
        parameters: params || {},
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getSpaceProperties", this.path("/space/${spaceKey}/property"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getSpaceProperties(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Create space property. Creates a new space property.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-space-spaceKey-property-post
 * @param {string} spaceKey REQUIRED The key of the space that the property will be created in.
 * @param {Object} request Body parameters
 *  - {string} key, The key of the new property. Maximum: 255
 *  - {object} value, The value of the property. This can be empty or a complex object
 *  refer: https://developer.atlassian.com/cloud/confluence/rest/#/definitions/PropertyValue
 * @param {Function} cb, callback function 
 */
Space.prototype.createSpaceProperty= function(spaceKey, request, cb){

    var args = {
        path: {
            spaceKey: spaceKey
        },
        data: request || {},
        headers: { 
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("createSpaceProperty", this.path("/space/${spaceKey}/property"), HttpMethod.POST);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.createSpaceProperty(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get space property. Returns a space property.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-space-spaceKey-property-key-get
 * @param {string} spaceKey REQUIRED The key of the space that the property is in.
 * @param {string} key REQUIRED The key of the space property.
 * @param {Object} params Query parameters
 *  - {string} expand, A multi-value parameter indicating which properties of the space property to expand. By default, the version object is expanded.
 *    . version, returns information about the version of the content.
 *    . space, returns the space that the properties are in.
 * @param {Function} cb, callback function 
 */
Space.prototype.getSpaceProperty = function(spaceKey, key, params, cb){

    var args = {
        path: {
            spaceKey: spaceKey,
            key: key
        },
        parameters: params || {},
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getSpaceProperty", this.path("/space/${spaceKey}/property/${key}"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getSpaceProperty(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Create space property for key. Creates a new space property. 
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-space-spaceKey-property-key-post
 * @param {string} spaceKey REQUIRED The key of the space that the property will be created in.
 * @param {string} key REQUIRED The key of the property to be created.
 * @param {Object} request Body parameters
 *  - {object} value, The value of the property. This can be empty or a complex object
 *  refer: https://developer.atlassian.com/cloud/confluence/rest/#/definitions/PropertyValue
 * @param {Function} cb, callback function 
 */
Space.prototype.createSpacePropertyForKey= function(spaceKey, key, request, cb){

    var args = {
        path: {
            spaceKey: spaceKey,
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
    client.registerMethod("createSpacePropertyForKey", this.path("/space/${spaceKey}/property/${key}"), HttpMethod.POST);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.createSpacePropertyForKey(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Update space property. Updates a space property. Note, you cannot update the key of a space property, only the value.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-space-spaceKey-property-key-put
 * @param {string} spaceKey REQUIRED The key of the space that the property is in.
 * @param {string} key REQUIRED The key of the property to be updated.
 * @param {Object} request Body parameters
 *  - {object} value, The value of the property.
 *  - {object} version REQUIRED
 *    - {boolean} minorEdit, If `minorEdit` is set to 'true', no notification email or activity\nstream will be generated for the change.
 *    - {integer} number, required. The new version for the updated space property. 
 * @param {Function} cb, callback function 
 */
Space.prototype.updateSpaceProperty = function(spaceKey, key, request, cb){

    var args = {
        path: {
            spaceKey: spaceKey,
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
    client.registerMethod("updateSpaceProperty", this.path("/space/${spaceKey}/property/${key}"), HttpMethod.PUT);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.updateSpaceProperty(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Delete space property. Deletes a space property.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-space-spaceKey-property-key-delete
 * @param {string} spaceKey REQUIRED The key of the space that the property is in.
 * @param {string} key REQUIRED The key of the property to be deleted.
 * @param {Function} cb, callback function 
 */
Space.prototype.deleteSpaceProperty = function(spaceKey, key, cb){

    var args = {
        path: {
            spaceKey: spaceKey,
            key: key
        },
        headers: { 
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("deleteSpaceProperty", this.path("/space/${spaceKey}/property/${key}"), HttpMethod.DELETE);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.deleteSpaceProperty(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get space settings. Returns the settings of a space. Currently only the routeOverrideEnabled setting can be returned.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-space-spaceKey-settings-get
 * @param {string} spaceKey REQUIRED The key of the space to be queried for its settings.
 * @param {Function} cb, callback function 
 */
Space.prototype.getSpaceSettings = function(spaceKey, cb){

    var args = {
        path: {
            spaceKey: spaceKey
        },
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getSpaceSettings", this.path("/space/${spaceKey}/settings"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getSpaceSettings(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Update space settings. Updates the settings for a space. Currently only the routeOverrideEnabled setting can be updated.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-space-spaceKey-settings-get
 * @param {string} spaceKey REQUIRED The key of the space whose settings will be updated.
 * @param {object} request Body parameters
 *   - {boolean} routeOverrideEnabled, Defines whether an override for the space home should be used. 
 * @param {Function} cb, callback function 
 */
Space.prototype.updateSpaceSettings = function(spaceKey, request, cb){

    var args = {
        path: {
            spaceKey: spaceKey
        },
        data: request || {},
        headers: { 
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("updateSpaceSettings", this.path("/space/${spaceKey}/settings"), HttpMethod.PUT);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.updateSpaceSettings(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get space theme. Returns the theme selected for a space, if one is set. If no space theme is set, this means that the space is inheriting the global look and feel settings.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-space-spaceKey-theme-get
 * @param {string} spaceKey REQUIRED The key of the space to be queried for its theme.
 * @param {Function} cb, callback function 
 */
Space.prototype.getSpaceTheme = function(spaceKey, cb){

    var args = {
        path: {
            spaceKey: spaceKey
        },
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getSpaceTheme", this.path("/space/${spaceKey}/theme"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getSpaceTheme(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Set space theme. Sets the theme for a space. Note, if you want to reset the space theme to the default Confluence theme, use the ‘Reset space theme’ method instead of this method.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-space-spaceKey-theme-put
 * @param {string} spaceKey REQUIRED The key of the space to be queried for its theme.
 * @param {object} requet Body parameters
 *   - {string} themeKey, The key of the theme to be set as the space theme.
 * @param {Function} cb, callback function 
 */
Space.prototype.setSpaceTheme = function(spaceKey, request, cb){

    var args = {
        path: {
            spaceKey: spaceKey
        },
        data: request || {},
        headers: { 
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("setSpaceTheme", this.path("/space/${spaceKey}/theme"), HttpMethod.PUT);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.setSpaceTheme(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Reset space theme. Resets the space theme. This means that the space will inherit the global look and feel settings
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-space-spaceKey-theme-delete
 * @param {string} spaceKey REQUIRED The key of the space to be queried for its theme.
 * @param {Function} cb, callback function 
 */
Space.prototype.resetSpaceTheme = function(spaceKey, cb){

    var args = {
        path: {
            spaceKey: spaceKey
        },
        headers: { 
            "Accept": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("resetSpaceTheme", this.path("/space/${spaceKey}/theme"), HttpMethod.DELETE);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.resetSpaceTheme(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

module.exports = Space;