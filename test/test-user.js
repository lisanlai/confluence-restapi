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

describe('ConfluenceAPI: User Module', function () {
    this.timeout(15000);

    describe('#getUser', function(){
        it('should get user information', function (done) {
            var confluenceAPI = ConfluenceAPI.create(config);

            var params = {
                username : 'sam2.li'
            };

            confluenceAPI.user.getUser(params, function(err, data) {
                expect(err).to.be.null;
                expect(data).not.to.be.null;
                expect(data).to.be.an('object')
                expect(data.username).to.be.equals(params.username);
                done();
            });
        });
    });


    describe('#getAnonymousUser', function(){
        it('should get anonymous user information', function (done) {
            var confluenceAPI = ConfluenceAPI.create(config);

            var params = {
                expand : ['operations']
            };

            confluenceAPI.user.getAnonymousUser(params, function(err, data) {
                expect(err).to.be.null;
                expect(data).not.to.be.null;
                expect(data).to.be.an('object')
                done();
            });
        });
    });

    describe('#getCurrentUser', function(){
        it('should get current user information', function (done) {
            var confluenceAPI = ConfluenceAPI.create(config);

            var params = {
                expand : ['details.personal']
            };

            confluenceAPI.user.getCurrentUser(params, function(err, data) {
                expect(err).to.be.null;
                expect(data).not.to.be.null;
                expect(data).to.be.an('object')
                expect(data.displayName).to.be.equals("Sam Li");
                done();
            });
        });
    });

    describe('#getMemberships', function(){
        it('should get member ships for user', function (done) {
            var confluenceAPI = ConfluenceAPI.create(config);

            var params = {
                username : "admin"
            };

            confluenceAPI.user.getMemberships(params, function(err, data) {
                expect(err).to.be.null;
                expect(data).not.to.be.null;
                expect(data).to.be.an('object')
                expect(data.results[0].type).to.be.equals("group");
                expect(data.results[0].name).to.be.equals("site-admins");
                done();
            });
        });
    });

    describe('#getContentWatchStatus', function(){
        it('should get content watch status for user', function (done) {
            var confluenceAPI = ConfluenceAPI.create(config);
        
            var contentId = "262146";
            var params = {
                username : "sam2.li"
            };

            confluenceAPI.user.getContentWatchStatus(contentId, params, function(err, data) {
                expect(err).to.be.null;
                expect(data).not.to.be.null;
                expect(data).to.be.an('object');
                expect(data.watching).to.be.false;
                done();
            });
        });
    });

    describe('#addContentWatcher', function(){
        it('should add watcher to content successfully', function (done) {
            var confluenceAPI = ConfluenceAPI.create(config);
        
            var contentId = "262146";
            var params = {
                username : "sam2.li"
            };

            confluenceAPI.user.addContentWatcher(contentId, params, function(err, data) {
                expect(err).to.be.null;
                expect(data).not.to.be.null;
                expect(data).to.be.an('object');
                expect(data.code).to.be.equals(204);
                done();
            });
        });
    });

    describe('#getContentWatchStatus', function(){
        it('should get content watch status for user', function (done) {
            var confluenceAPI = ConfluenceAPI.create(config);
        
            var contentId = "262146";
            var params = {
                username : "sam2.li"
            };

            confluenceAPI.user.getContentWatchStatus(contentId, params, function(err, data) {
                expect(err).to.be.null;
                expect(data).not.to.be.null;
                expect(data).to.be.an('object');
                expect(data.watching).to.be.true;
                done();
            });
        });
    });

    describe('#removeContentWatcher', function(){
        it('should remove watcher from content successfully', function (done) {
            var confluenceAPI = ConfluenceAPI.create(config);
        
            var contentId = "262146";
            var params = {
                username : "sam2.li"
            };

            confluenceAPI.user.removeContentWatcher(contentId, params, function(err, data) {
                expect(err).to.be.null;
                expect(data).not.to.be.null;
                expect(data).to.be.an('object');
                expect(data.code).to.be.equals(204);
                done();
            });
        });
    });

    describe('#getContentWatchStatus', function(){
        it('should get content watch status for user', function (done) {
            var confluenceAPI = ConfluenceAPI.create(config);
        
            var contentId = "262146";
            var params = {
                username : "sam2.li"
            };

            confluenceAPI.user.getContentWatchStatus(contentId, params, function(err, data) {
                expect(err).to.be.null;
                expect(data).not.to.be.null;
                expect(data).to.be.an('object');
                expect(data.watching).to.be.false;
                done();
            });
        });
    });


    describe('#getLabelWatchStatus', function(){
        it('should get label watch status for user', function (done) {
            var confluenceAPI = ConfluenceAPI.create(config);
        
            var labelName = "ios";
            var params = {
                username : "sam2.li"
            };

            confluenceAPI.user.getLabelWatchStatus(labelName, params, function(err, data) {
                expect(err).to.be.null;
                expect(data).not.to.be.null;
                expect(data).to.be.an('object');
                done();
            });
        });
    });

    describe('#addLabelWatcher', function(){
        it('should add label watch status for user', function (done) {
            var confluenceAPI = ConfluenceAPI.create(config);
        
            var labelName = "ios";
            var params = {
                username : "sam2.li"
            };

            confluenceAPI.user.addLabelWatcher(labelName, params, function(err, data) {
                expect(err).to.be.null;
                expect(data).not.to.be.null;
                expect(data).to.be.an('object');
                expect(data.code).to.be.equals(204);
                done();
            });
        });
    });

    describe('#getLabelWatchStatus', function(){
        it('should get label watch status for user', function (done) {
            var confluenceAPI = ConfluenceAPI.create(config);
        
            var labelName = "ios";
            var params = {
                username : "sam2.li"
            };

            confluenceAPI.user.getLabelWatchStatus(labelName, params, function(err, data) {
                expect(err).to.be.null;
                expect(data).not.to.be.null;
                expect(data).to.be.an('object');
                expect(data.watching).to.be.true;
                done();
            });
        });
    });

    describe('#removeLabelWatcher', function(){
        it('should remove label watch status for user', function (done) {
            var confluenceAPI = ConfluenceAPI.create(config);
        
            var labelName = "ios";
            var params = {
                username : "sam2.li"
            };

            confluenceAPI.user.removeLabelWatcher(labelName, params, function(err, data) {
                expect(err).to.be.null;
                expect(data).not.to.be.null;
                expect(data).to.be.an('object');
                expect(data.code).to.be.equals(204);
                done();
            });
        });
    });

    describe('#getLabelWatchStatus', function(){
        it('should get label watch status for user', function (done) {
            var confluenceAPI = ConfluenceAPI.create(config);
        
            var labelName = "ios";
            var params = {
                username : "sam2.li"
            };

            confluenceAPI.user.getLabelWatchStatus(labelName, params, function(err, data) {
                expect(err).to.be.null;
                expect(data).not.to.be.null;
                expect(data).to.be.an('object');
                expect(data.watching).to.be.false;
                done();
            });
        });
    });

    describe('#getSpaceWatchStatus', function(){
        it('should get space watch status for user', function (done) {
            var confluenceAPI = ConfluenceAPI.create(config);
        
            var spaceKey = "TES";
            var params = {
                username : "sam2.li"
            };

            confluenceAPI.user.getSpaceWatchStatus(spaceKey, params, function(err, data) {
                expect(err).to.be.null;
                expect(data).not.to.be.null;
                expect(data).to.be.an('object');
                done();
            });
        });
    });

    describe('#removeSpaceWatcher', function(){
        it('should remove space watch status for user', function (done) {
            var confluenceAPI = ConfluenceAPI.create(config);
        
            var spaceKey = "TES";
            var params = {
                username : "sam2.li"
            };

            confluenceAPI.user.removeSpaceWatcher(spaceKey, params, function(err, data) {
                expect(err).to.be.null;
                expect(data).not.to.be.null;
                expect(data).to.be.an('object');
                expect(data.code).to.be.equals(204);
                done();
            });
        });
    });

    describe('#getSpaceWatchStatus', function(){
        it('should get space watch status for user', function (done) {
            var confluenceAPI = ConfluenceAPI.create(config);
        
            var spaceKey = "TES";
            var params = {
                username : "sam2.li"
            };

            confluenceAPI.user.getSpaceWatchStatus(spaceKey, params, function(err, data) {
                expect(err).to.be.null;
                expect(data).not.to.be.null;
                expect(data).to.be.an('object');
                expect(data.watching).to.be.false;
                done();
            });
        });
    });

    describe('#addSpaceWatcher', function(){
        it('should add space watch status for user', function (done) {
            var confluenceAPI = ConfluenceAPI.create(config);
        
            var spaceKey = "TES";
            var params = {
                username : "sam2.li"
            };

            confluenceAPI.user.addSpaceWatcher(spaceKey, params, function(err, data) {
                expect(err).to.be.null;
                expect(data).not.to.be.null;
                expect(data).to.be.an('object');
                expect(data.code).to.be.equals(204);
                done();
            });
        });
    });

    describe('#getSpaceWatchStatus', function(){
        it('should get space watch status for user', function (done) {
            var confluenceAPI = ConfluenceAPI.create(config);
        
            var spaceKey = "TES";
            var params = {
                username : "sam2.li"
            };

            confluenceAPI.user.getSpaceWatchStatus(spaceKey, params, function(err, data) {
                expect(err).to.be.null;
                expect(data).not.to.be.null;
                expect(data).to.be.an('object');
                expect(data.watching).to.be.true;
                done();
            });
        });
    });
    
});

