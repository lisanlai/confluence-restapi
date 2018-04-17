/**!
 * ConfluenceAPI - lib/resources/audit.js
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
 * Audit module.
 * @param {Object} client 
 */
function Audit(client){
    this.constructor.super_.call(this, client);
}

util.inherits(Audit, RESTFulResource);

/**
 * Get audit records.
 * @param {Object} params
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-audit-get
 *   - {string} endDate, Filters the results to the records on or before the endDate. The endDate must be specified as a timestamp. 
 *   - {integer} limit, The maximum number of records to return per page. Note, this may be restricted by fixed system limits. Default: 1000, Minimum: 0
 *   - {string} searchString, Filters the results to records that have string property values matching the searchString.
 *   - {integer} start, The starting index of the returned records. Default: 0, Minimum: 0
 *   - {string} startDate, Filters the results to the records on or after the startDate. The startDate must be specified as a timestamp.
 * @param {Function} cb, callback function 
 */
Audit.prototype.getAuditRecords = function(params, cb){

    var args = {
        parameters: params || {},
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getAuditRecords", this.path("/audit"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getAuditRecords(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Create audit record.
 * @param {Object} request, the body of request
 * refer: https://developer.atlassian.com/cloud/confluence/rest/#api-audit-post
 *   - {AffectedObject} affectedObject, refer https://developer.atlassian.com/cloud/confluence/rest/#/definitions/AffectedObject
 *   - {AffectedObject} associatedObjects, Objects that were associated with the event. For example, if the event was a space permission change then the associated object would be the space.
 *   - {object} author, The user that actioned the event. If author is not specified, then all author properties will be set to null/empty, except for type which will be set to ‘user’.
 *   - {string} category, The category of the event, which is displayed in the ‘Event type’ column on the audit log in the Confluence UI.
 *   - {ChangeValues} changedValues,  https://developer.atlassian.com/cloud/confluence/rest/#/definitions/ChangedValue
 *   - {string} creationDate, The creation date-time of the audit record, as a timestamp. This is converted to a date-time display in the Confluence UI. If the creationDate is not specified, then it will be set to the timestamp for the current date-time.
 *   - {string} description, A long description of the event, which is displayed in the ‘Description’ field on the audit log in the Confluence UI.
 *   - {string} remoteAddress, The IP address of the computer where the event was initiated from.
 *   - {string} summary, The summary of the event, which is displayed in the ‘Change’ column on the audit log in the Confluence UI.
 *   - {boolean} sysAdmin, Indicates whether the event was actioned by a system administrator. Default: false
 * @param {Function} cb, callback function 
 */
Audit.prototype.createAuditRecord = function(request, cb){

    var args = {
        data : request || {},
        headers: { 
            "Accept": "application/json",
            "Content-Type" : "application/json"
        }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("createAuditRecord", this.path("/audit"), HttpMethod.POST);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.createAuditRecord(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Export audit records. Exports audit records as a CSV file or ZIP file.
 * @param {object} params 
 *   - {string} endDate, Filters the exported results to the records on or before the endDate. The endDate must be specified as a timestamp.
 *   - {string} format, The format of the export file for the audit records. Default: csv  Valid values: csv zip
 *   - {string} searchString, Filters the exported results to records that have string property values matching the searchString.
 *   - {string} startDate, Filters the exported results to the records on or after the startDate. The startDate must be specified as a timestamp.
 * @param {function} cb callback function
 */
Audit.prototype.exportAuditRecords = function(params, cb){

    var args = {
        parameters: params || {},
        headers: { "Accept": "application/zip" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("exportAuditRecords", this.path("/audit/export"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.exportAuditRecords(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get retention period. Returns the retention period for records in the audit log.
 * @param {function} cb callback function
 */
Audit.prototype.getRetentionPeriod = function(cb){

    var args = {
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getRetentionPeriod", this.path("/audit/retention"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getRetentionPeriod(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Set retention period. Sets the retention period for records in the audit log
 * @param {object} request, Body parameters
 *   - {integer} number, The number of units for the retention period.
 *   - {string} units, The unit of time that the retention period is measured in. 
 *     Valid values: NANOS MICROS MILLIS SECONDS MINUTES HOURS HALF_DAYS DAYS WEEKS MONTHS YEARS DECADES CENTURIES MILLENNIA ERAS FOREVER
 * @param {function} cb callback function
 */
Audit.prototype.setRetentionPeriod = function(request, cb){

    var args = {
        data: request || {},
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("setRetentionPeriod", this.path("/audit/retention"), HttpMethod.PUT);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.setRetentionPeriod(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

/**
 * Get audit records for time period.
 * @param {object} params, Query parameters
 *   - {integer} limit, The maximum number of records to return per page. Note, this may be restricted by fixed system limits. Default: 1000, Minimum: 0
 *   - {integer} number, The number of units for the time period. Default: 3
 *   - {string} searchString, Filters the results to records that have string property values matching the searchString.
 *   - {integer} start, The starting index of the returned records. Default: 0, Minimum: 0
 *   - {string} units, The unit of time that the time period is measured in. Default: MONTHS
 *     Valid values: NANOS MICROS MILLIS SECONDS MINUTES HOURS HALF_DAYS DAYS WEEKS MONTHS YEARS DECADES CENTURIES
 * @param {function} cb callback function
 */
Audit.prototype.getAuditRecordsForPeriod = function(params, cb){

    var args = {
        parameters: params || {},
        headers: { "Accept": "application/json" }
    };

    var client = this.client;
    // registering remote methods 
    client.registerMethod("getAuditRecordsForPeriod", this.path("/audit/since"), HttpMethod.GET);
    
    /**
     * this would construct the following URL before invocation
     */
    client.methods.getAuditRecordsForPeriod(args, function (data, response) {
        client.processCallback(cb, null, data, response);
    }).on('error', function (err) {
        client.processCallback(cb, err);
    });
};

module.exports = Audit;