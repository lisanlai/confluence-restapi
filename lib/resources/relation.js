/**!
 * ConfluenceAPI - lib/resources/relation.js
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
 * Relation module.
 * @param {Object} client 
 */
function Relation(client){
    this.constructor.super_.call(this, client);
}

util.inherits(Relation, RESTFulResource);

/**
 * Find target entities related to a source entity. Returns all target entities that have a particular relationship to the source entity. Note, relationships are one way.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-relation-relationName-from-sourceType-sourceKey-to-targetType-get
 * @param {string} relationName REQUIRED The name of the relationship. This method supports relationships created via Create relationship. Note, this method does not support ‘favourite’ relationships.
 * @param {string} sourceKey REQUIRED The identifier for the source entity:
 *    . If sourceType is ‘user’, then specify either ‘current’ (logged-in user) or the user key.
 *    . If sourceType is ‘content’, then specify the content ID.
 *    . If sourceType is ‘space’, then specify the space key.
 * @param {string} sourceType REQUIRED The source entity type of the relationship. Valid values: user content space
 * @param {string} targetType REQUIRED The target entity type of the relationship. Valid values: user content space
 * @param {object} params Query parameters
 *   - {string} expand, A multi-value parameter indicating which properties of the response object to expand.
 *      . relationData, returns information about the relationship, such as who created it and when it was created.
 *      . source returns the source entity.
 *      . target returns the target entity.
 *   - {integer} limit, The maximum number of relationships to return per page. Note, this may be restricted by fixed system limits. Default: 25, Minimum: 0
 *   - {integer} start, The starting index of the returned relationships. Default: 0, Minimum: 0
 *   - {string} sourceStatus, The status of the source. This parameter is only used when the sourceType is ‘content’.
 *   - {integer} sourceVersion, The version of the source. This parameter is only used when the sourceType is ‘content’ and the sourceStatus is ‘historical’.
 *   - {string} targetStatus, The status of the target. This parameter is only used when the targetType is ‘content’.
 *   - {integer} targetVersion, The version of the target. This parameter is only used when the targetType is ‘content’ and the targetStatus is ‘historical’.
 *  @param {function} cb Callback function
 */
Relation.prototype.findRelatedEntitiesS2T = function(relationName, sourceKey, sourceType, targetType, params, cb){
    var args = {
        path: { 
            "relationName": relationName,
            "sourceKey": sourceKey,
            "sourceType": sourceType,
            "targetType": targetType
        },
        parameters: params || {},
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("findRelatedEntitiesS2T", this.path("/relation/${relationName}/from/${sourceType}/${sourceKey}/to/${targetType}"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.findRelatedEntitiesS2T(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Find target entities related to a source entity. Returns all target entities that have a particular relationship to the source entity. Note, relationships are one way.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-relation-relationName-to-targetType-targetKey-from-sourceType-get
 * @param {string} relationName REQUIRED The name of the relationship. This method supports relationships created via Create relationship. Note, this method does not support ‘favourite’ relationships.
 * @param {string} targetType REQUIRED The target entity type of the relationship. Valid values: user content space
 * @param {string} targetKey REQUIRED The identifier for the source entity:
 *    . If sourceType is ‘user’, then specify either ‘current’ (logged-in user) or the user key.
 *    . If sourceType is ‘content’, then specify the content ID.
 *    . If sourceType is ‘space’, then specify the space key.
 * @param {string} sourceType REQUIRED The source entity type of the relationship. Valid values: user content space
 * @param {object} params Query parameters
 *   - {string} expand, A multi-value parameter indicating which properties of the response object to expand.
 *      . relationData, returns information about the relationship, such as who created it and when it was created.
 *      . source returns the source entity.
 *      . target returns the target entity.
 *   - {integer} limit, The maximum number of relationships to return per page. Note, this may be restricted by fixed system limits. Default: 25, Minimum: 0
 *   - {integer} start, The starting index of the returned relationships. Default: 0, Minimum: 0
 *   - {string} sourceStatus, The status of the source. This parameter is only used when the sourceType is ‘content’.
 *   - {integer} sourceVersion, The version of the source. This parameter is only used when the sourceType is ‘content’ and the sourceStatus is ‘historical’.
 *   - {string} targetStatus, The status of the target. This parameter is only used when the targetType is ‘content’.
 *   - {integer} targetVersion, The version of the target. This parameter is only used when the targetType is ‘content’ and the targetStatus is ‘historical’.
 *  @param {function} cb Callback function
 */
Relation.prototype.findRelatedEntitiesT2S = function(relationName, targetType, targetKey, sourceType, params, cb){
    var args = {
        path: { 
            "relationName": relationName,
            "targetType": targetType,
            "targetKey": targetKey,
            "sourceType": sourceType
        },
        parameters: params || {},
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("findRelatedEntitiesT2S", this.path("/relation/{relationName}/to/{targetType}/{targetKey}/from/{sourceType}"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.findRelatedEntitiesT2S(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Find relationship from source to target. Find whether a particular type of relationship exists from a source entity to a target entity. Note, relationships are one way.
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-relation-relationName-from-sourceType-sourceKey-to-targetType-targetKey-get
 * @param {string} relationName REQUIRED The name of the relationship. This method supports relationships created via Create relationship. Note, this method does not support ‘favourite’ relationships.
 * @param {string} sourceKey REQUIRED The identifier for the source entity:
 *   . If sourceType is ‘user’, then specify either ‘current’ (logged-in user) or the user key.
 *   . If sourceType is ‘content’, then specify the content ID.
 *   . If sourceType is ‘space’, then specify the space key.
 * @param {string} sourceType REQUIRED The source entity type of the relationship. This must be ‘user’, if the relationName is ‘favourite’. Valid values: user content space
 * @param {string} targetType REQUIRED The target entity type of the relationship. This must be ‘space’ or ‘content’, if the relationName is ‘favourite’. Valid values: user content space
 * @param {string} targetKey REQUIRED The identifier for the target entity:
 *   . If sourceType is ‘user’, then specify either ‘current’ (logged-in user) or the user key.
 *   . If sourceType is ‘content’, then specify the content ID.
 *   . If sourceType is ‘space’, then specify the space key.
 * @param {object} params Query parameters
 *   - {string} expand, A multi-value parameter indicating which properties of the response object to expand.
 *      . relationData, returns information about the relationship, such as who created it and when it was created.
 *      . source returns the source entity.
 *      . target returns the target entity.
 *   - {string} sourceStatus, The status of the source. This parameter is only used when the sourceType is ‘content’.
 *   - {integer} sourceVersion, The version of the source. This parameter is only used when the sourceType is ‘content’ and the sourceStatus is ‘historical’.
 *   - {string} targetStatus, The status of the target. This parameter is only used when the targetType is ‘content’.
 *   - {integer} targetVersion, The version of the target. This parameter is only used when the targetType is ‘content’ and the targetStatus is ‘historical’.
 *  @param {function} cb Callback function
 */
Relation.prototype.findRelationship = function(relationName, sourceKey, sourceType, targetType, targetKey, params, cb){
    var args = {
        path: { 
            "relationName": relationName,
            "sourceKey": sourceKey,
            "sourceType": sourceType,
            "targetType": targetType,
            "targetKey" : targetKey
        },
        parameters: params || {},
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("findRelationship", this.path("/relation/${relationName}/from/${sourceType}/${sourceKey}/to/${targetType}/${targetKey}"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.findRelationship(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Create relationship. Creates a relationship between two entities (user, space, content). 
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-relation-relationName-from-sourceType-sourceKey-to-targetType-targetKey-put
 * @param {string} relationName REQUIRED The name of the relationship. This method supports relationships created via Create relationship. Note, this method does not support ‘favourite’ relationships.
 * @param {string} sourceKey REQUIRED The identifier for the source entity:
 *   . If sourceType is ‘user’, then specify either ‘current’ (logged-in user) or the user key.
 *   . If sourceType is ‘content’, then specify the content ID.
 *   . If sourceType is ‘space’, then specify the space key.
 * @param {string} sourceType REQUIRED The source entity type of the relationship. This must be ‘user’, if the relationName is ‘favourite’.Valid values: user content space
 * @param {string} targetType REQUIRED The target entity type of the relationship. This must be ‘space’ or ‘content’, if the relationName is ‘favourite’. Valid values: user content space
 * @param {string} targetKey REQUIRED The identifier for the target entity:
 *   . If sourceType is ‘user’, then specify either ‘current’ (logged-in user) or the user key.
 *   . If sourceType is ‘content’, then specify the content ID.
 *   . If sourceType is ‘space’, then specify the space key.
 * @param {object} params Query parameters
 *   - {string} expand, A multi-value parameter indicating which properties of the response object to expand.
 *      . relationData, returns information about the relationship, such as who created it and when it was created.
 *      . source returns the source entity.
 *      . target returns the target entity.
 *   - {string} sourceStatus, The status of the source. This parameter is only used when the sourceType is ‘content’.
 *   - {integer} sourceVersion, The version of the source. This parameter is only used when the sourceType is ‘content’ and the sourceStatus is ‘historical’.
 *   - {string} targetStatus, The status of the target. This parameter is only used when the targetType is ‘content’.
 *   - {integer} targetVersion, The version of the target. This parameter is only used when the targetType is ‘content’ and the targetStatus is ‘historical’.
 *  @param {function} cb Callback function
 */
Relation.prototype.createRelationship = function(relationName, sourceKey, sourceType, targetType, targetKey, params, cb){
    var args = {
        path: { 
            "relationName": relationName,
            "sourceKey": sourceKey,
            "sourceType": sourceType,
            "targetType": targetType,
            "targetKey" : targetKey
        },
        parameters: params || {},
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("createRelationship", this.path("/relation/${relationName}/from/${sourceType}/${sourceKey}/to/${targetType}/${targetKey}"), HttpMethod.PUT);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.createRelationship(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Delete relationship. Deletes a relationship between two entities (user, space, content).
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-relation-relationName-from-sourceType-sourceKey-to-targetType-targetKey-delete
 * @param {string} relationName REQUIRED The name of the relationship.
 * @param {string} sourceKey REQUIRED The identifier for the source entity:
 *   . If sourceType is ‘user’, then specify either ‘current’ (logged-in user) or the user key.
 *   . If sourceType is ‘content’, then specify the content ID.
 *   . If sourceType is ‘space’, then specify the space key.
 * @param {string} sourceType REQUIRED The source entity type of the relationship. This must be ‘user’, if the relationName is ‘favourite’.Valid values: user content space
 * @param {string} targetType REQUIRED The target entity type of the relationship. This must be ‘space’ or ‘content’, if the relationName is ‘favourite’. Valid values: user content space
 * @param {string} targetKey REQUIRED The identifier for the target entity:
 *   . If sourceType is ‘user’, then specify either ‘current’ (logged-in user) or the user key.
 *   . If sourceType is ‘content’, then specify the content ID.
 *   . If sourceType is ‘space’, then specify the space key.
 * @param {object} params Query parameters
 *   - {string} expand, A multi-value parameter indicating which properties of the response object to expand.
 *      . relationData, returns information about the relationship, such as who created it and when it was created.
 *      . source returns the source entity.
 *      . target returns the target entity.
 *   - {string} sourceStatus, The status of the source. This parameter is only used when the sourceType is ‘content’.
 *   - {integer} sourceVersion, The version of the source. This parameter is only used when the sourceType is ‘content’ and the sourceStatus is ‘historical’.
 *   - {string} targetStatus, The status of the target. This parameter is only used when the targetType is ‘content’.
 *   - {integer} targetVersion, The version of the target. This parameter is only used when the targetType is ‘content’ and the targetStatus is ‘historical’.
 *  @param {function} cb Callback function
 */
Relation.prototype.deleteRelationship = function(relationName, sourceKey, sourceType, targetType, targetKey, params, cb){
    var args = {
        path: { 
            "relationName": relationName,
            "sourceKey": sourceKey,
            "sourceType": sourceType,
            "targetType": targetType,
            "targetKey" : targetKey
        },
        parameters: params || {},
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("deleteRelationship", this.path("/relation/${relationName}/from/${sourceType}/${sourceKey}/to/${targetType}/${targetKey}"), HttpMethod.DELETE);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.deleteRelationship(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

module.exports = Relation;