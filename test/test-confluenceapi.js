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

describe('ConfluenceAPI:Create Instance', function () {
    this.timeout(15000);

    describe('Constructor: #ConfluenceAPI', function(){

        it('should throw an error if no config object is passed in', function(){
            var msg = "ConfluenceAPI module expects a config object.";
            expect(function(){
                var confluenceAPI = ConfluenceAPI.create();
            }).to.throw(msg);
        });

        it('should throw an error if config is missing username and password', function(){
            var msg = "ConfluenceAPI module expects a config object with both a user and password.";
            expect(function(){
                var confluenceAPI = ConfluenceAPI.create({});
            }).to.throw(msg);
        });

        it('should throw an error if config is missing baseUrl', function(){
            var msg = "ConfluenceAPI module expects a config object with a baseUrl.";
            expect(function(){
                var confluenceAPI = ConfluenceAPI.create({
                    user: "test user",
                    password: "test pw"
                });
            }).to.throw(msg);
        });

        it('should return an instanceof Confluence with "new" keyword', function(){
            var confluenceAPI = ConfluenceAPI.create(config);
            expect(confluenceAPI).to.be.a.instanceof(ConfluenceAPI);
        });

        it('should return an instanceof Confluence without "new" keyword', function(){
            var confluenceAPI = ConfluenceAPI(config);
            expect(confluenceAPI).to.be.a.instanceof(ConfluenceAPI);
        });

    });

});

