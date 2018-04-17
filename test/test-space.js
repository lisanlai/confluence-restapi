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

describe('ConfluenceAPI: Space Module', function () {
    this.timeout(15000);

    describe('#getSpaces', function(){
        it('should get space list', function (done) {
            var confluenceAPI = ConfluenceAPI.create(config);

            var params = {
                start: 0,
                limit : 5
            };

            confluenceAPI.space.getSpaces(params, function(err, data) {
                expect(err).to.be.null;
                expect(data).not.to.be.null;
                expect(data).to.be.an('object');
                expect(data.size).to.be.gt(0);
                done();
            });
        });
    });

});