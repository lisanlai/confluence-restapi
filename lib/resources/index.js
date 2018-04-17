/**!
 * ConfluenceAPI - lib/resources/index.js
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

module.exports = {

    audit: require('./audit'),
    content: require('./content'),
    group: require('./group'),
    longtask: require('./longtask'),
    relation: require('./relation'),
    search: require('./search'),
    settings: require('./settings'),
    space: require('./space'),
    template: require('./template'),
    user: require('./user')
    
};
