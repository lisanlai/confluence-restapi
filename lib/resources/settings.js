/**!
 * ConfluenceAPI - lib/resources/settings.js
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
 * Settings module.
 * @param {Object} client 
 */
function Settings(client){
    this.constructor.super_.call(this, client);
}

util.inherits(Settings, RESTFulResource);

/**
 * Get look and feel settings. Returns the look and feel settings for the site or a single space. This includes attributes such as the color scheme, padding, and border radius.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-settings-lookandfeel-get
 * @param {string} spaceKey, The key of the space for which the look and feel settings will be returned. If this is not set, only the global look and feel settings are returned.
 * @param {function} cb Callback function 
 */
Settings.prototype.getLookAndFeelSettings = function(spaceKey, cb){
    var args = {
        parameters: {
            "spaceKey" : spaceKey
        },
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getLookAndFeelSettings", this.path("/settings/lookandfeel"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getLookAndFeelSettings(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Update look and feel settings. Updates the look and feel settings for the site or for a single space. If custom settings exist, they are updated. If no custom settings exist, then a set of custom settings is created.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-settings-lookandfeel-custom-post
 * @param {string} spaceKey, The key of the space for which the look and feel settings will be updated. If this is not set, the global look and feel settings will be updated.
 * @param {object} request Body parameters
 *  - {object} bordersAndDividers REQUIRED
 *    - {string} color
 *  - {object} content, refer: https://developer.atlassian.com/cloud/confluence/rest/#/definitions/ContentLookAndFeel
 *  - {object} header, refer: https://developer.atlassian.com/cloud/confluence/rest/#/definitions/HeaderLookAndFeel
 *  - {object} headings
 *    - {string} color
 *  - {object} links
 *    - {string} color
 *  - {object} menus, refer: https://developer.atlassian.com/cloud/confluence/rest/#/definitions/MenusLookAndFeel
 * @param {function} cb Callback function 
 */
Settings.prototype.updateLookAndFeelSettings = function(spaceKey, request, cb){
    var args = {
        parameters: {
            "spaceKey" : spaceKey
        },
        data: request || {},
        headers: { 
            "Accept": "application/json",
            "Content-Type": "application/json" 
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("updateLookAndFeelSettings", this.path("/settings/lookandfeel/custom"), HttpMethod.POST);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.updateLookAndFeelSettings(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Reset look and feel settings. Resets the custom look and feel settings for the site or a single space. This changes the values of the custom settings to be the same as the default settings. 
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-settings-lookandfeel-custom-delete
 * @param {string} spaceKey, The key of the space for which the look and feel settings will be reset. If this is not set, the global look and feel settings will be reset.
 * @param {function} cb Callback function 
 */
Settings.prototype.resetLookAndFeelSettings = function(spaceKey, cb){
    var args = {
        parameters: {
            "spaceKey" : spaceKey
        },
        headers: { 
            "Accept": "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("resetLookAndFeelSettings", this.path("/settings/lookandfeel/custom"), HttpMethod.DELETE);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.resetLookAndFeelSettings(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Set look and feel settings. Sets the look and feel settings to either the default settings or the custom settings, for the site or a single space. Note, the default space settings are inherited from the current global settings.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-settings-lookandfeel-selected-put
 * @param {string} spaceKey, The key of the space for which the look and feel settings will be set. If this is not set, the global look and feel settings will be set.
 * @param {object} request Body parameters
 *  - {object} custom, refer: https://developer.atlassian.com/cloud/confluence/rest/#/definitions/LookAndFeel
 *  - {object} global, refer: https://developer.atlassian.com/cloud/confluence/rest/#/definitions/LookAndFeel
 *  - {string} selected, The look and feel scheme. 
 * @param {function} cb Callback function 
 */
Settings.prototype.setLookAndFeelSettings = function(spaceKey, request, cb){
    var args = {
        parameters: {
            "spaceKey" : spaceKey
        },
        data: request || {},
        headers: { 
            "Accept": "application/json",
            "Content-Type": "application/json" 
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("setLookAndFeelSettings", this.path("/settings/lookandfeel/selected"), HttpMethod.PUT);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.setLookAndFeelSettings(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get system info. Returns the system information for the Confluence Cloud tenant. This information is used by Atlassian.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-settings-systemInfo-get
 * @param {function} cb Callback function 
 */
Settings.prototype.getSystemInfo = function(cb){
    var args = {
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getSystemInfo", this.path("/settings/systemInfo"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getSystemInfo(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get themes. Returns all themes, not including the default theme.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-settings-theme-get
 * @param {object} params Query parameters
 *   - {integer} limit, The maximum number of themes to return per page. Note, this may be restricted by fixed system limits. Default: 100, Minimum: 0
 *   - {integer} start, The starting index of the returned themes. Default: 0, Minimum: 0
 * @param {function} cb Callback function 
 */
Settings.prototype.getThemes = function(params,cb){
    var args = {
        parameters: params || {},
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getThemes", this.path("/settings/theme"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getThemes(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get theme. Returns a theme. This includes information about the theme name, description, and icon.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-settings-theme-themeKey-get
 * @param {string} themeKey REQUIRED The key of the theme to be returned.
 * @param {function} cb Callback function 
 */
Settings.prototype.getTheme = function(themeKey,cb){
    var args = {
        path: {
            themeKey: themeKey
        },
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getTheme", this.path("/settings/theme/${themeKey}"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getTheme(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get global theme. Returns the globally assigned theme.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-settings-theme-selected-get
 * @param {function} cb Callback function 
 */
Settings.prototype.getGlobalTheme = function(cb){
    var args = {
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getGlobalTheme", this.path("/settings/theme/selected"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getGlobalTheme(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

module.exports = Settings;