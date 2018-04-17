/**
 * Tests for ConfluenceAPI.js
 *
 * Note that there are dependencies between some of these tests.
 * For instance, the delete tests clean up content created in post tests.
 * This design is intentional to speed execution of the full suite.
 * So, running these tests using mocha's -g or -f options may cause tests to
 * fail or to leave test data in the test confluence space.
 */

var expect = require('chai').expect;
var ConfluenceAPI = require("../lib/ConfluenceAPI");
var config = require('./config') || {};

describe('ConfluenceAPI: Search Module', function () {
    this.timeout(15000);

    describe('#quickSearch', function(){
        it('should search out content without exception', function (done) {
            var confluenceAPI = ConfluenceAPI.create(config);

            var keyword = "test";

            confluenceAPI.search.quickSearch(keyword, function(err, data) {
                expect(err).to.be.null;
                expect(data).not.to.be.null;
                expect(data).to.be.an('object')
                expect(data.size).to.be.gte(0);
                expect(data.cqlQuery).to.be.eq("title ~ \""+keyword+"*\"");
                done();
            });
        });
    });

    describe('#search', function(){
        it('should search out content without exception', function (done) {
            var confluenceAPI = ConfluenceAPI.create(config);

            var params = {
                cql: "creator=admin and title ~ \"test*\"",
                limit: 10,
                start: 0
            };

            confluenceAPI.search.search(params, function(err, data) {
                expect(err).to.be.null;
                expect(data).not.to.be.null;
                expect(data).to.be.an('object')
                expect(data.size).to.be.gte(0);
                expect(data.start).to.be.eq(params.start);
                expect(data.limit).to.be.eq(params.limit);
                expect(data.cqlQuery).to.be.eq(params.cql);
                done();
            });
        });
    });

});