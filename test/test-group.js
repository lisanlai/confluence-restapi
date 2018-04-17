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

describe('ConfluenceAPI: Group Module', function () {
    this.timeout(15000);

    describe('#getGroups', function(){
        it('should get group list', function (done) {
            var confluenceAPI = ConfluenceAPI.create(config);

            var params = {
                limit : 10
            };

            confluenceAPI.group.getGroups(params, function(err, data) {
                expect(err).to.be.null;
                expect(data).not.to.be.null;
                expect(data).to.be.an('object')
                expect(data.size).to.be.gt(0);
                done();
            });
        });
    });


    describe('#getGroup', function(){
        it('should get group information', function (done) {
            var confluenceAPI = ConfluenceAPI.create(config);

            var groupName = "site-admins";

            confluenceAPI.group.getGroup(groupName, function(err, data) {
                expect(err).to.be.null;
                expect(data).not.to.be.null;
                expect(data).to.be.an('object')
                expect(data.name).to.be.eq(groupName);
                done();
            });
        });
    });

    describe('#getGroupMembers', function(){
        it('should get group members', function (done) {
            var confluenceAPI = ConfluenceAPI.create(config);

            var groupName = "site-admins";
            var params = {
                start: 0,
                limit: 10
            }

            confluenceAPI.group.getGroupMembers(groupName, params, function(err, data) {
                expect(err).to.be.null;
                expect(data).not.to.be.null;
                expect(data).to.be.an('object')
                expect(data.start).to.be.eq(params.start);
                expect(data.limit).to.be.eq(params.limit);
                expect(data.size).to.be.gte(0);
                done();
            });
        });
    });

});