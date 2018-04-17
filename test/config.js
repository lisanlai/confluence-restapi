/**
 * Tests for ConfluenceAPI.js
 *
 * Note that there are dependencies between some of these tests.
 * For instance, the delete tests clean up content created in post tests.
 * This design is intentional to speed execution of the full suite.
 * So, running these tests using mocha's -g or -f options may cause tests to
 * fail or to leave test data in the test confluence space.
 */

'use strict';

var Config = {
    user: "sam.li@grr.la",
    password: "pass1234",
    baseUrl:  "https://confluenceapi.atlassian.net/wiki/rest/api"
}

module.exports = Config;