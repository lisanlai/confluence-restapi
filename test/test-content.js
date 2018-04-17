/**
 * Tests for ConfluenceAPI.js
 *
 * Note that there are dependencies between some of these tests.
 * For instance, the delete tests clean up content created in post tests.
 * This design is intentional to speed execution of the full suite.
 * So, running these tests using mocha's -g or -f options may cause tests to
 * fail or to leave test data in the test confluence space.
 */

var fs = require("fs");
var expect = require('chai').expect;
var ConfluenceAPI = require("../lib/ConfluenceAPI");
var config = require('./config') || {};

var tempContentId = '';
var versionNum = 0;

describe('ConfluenceAPI: Content Module', function () {
    this.timeout(15000);

    describe('#getContent', function(){
        it('should get content list', function (done) {
            var confluenceAPI = ConfluenceAPI.create(config);

            var params = {
                start : 0,
                limit : 10
            };

            confluenceAPI.content.getContent(params, function(err, data) {
                expect(err).to.be.null;
                expect(data).not.to.be.null;
                expect(data).to.be.an('object')
                expect(data.start).to.be.eq(params.start);
                expect(data.limit).to.be.eq(params.limit);
                expect(data.size).to.be.gt(0);
                done();
            });
        });
    });

    describe('#createContent', function(){
        it('should create content successfully', function (done) {
            var confluenceAPI = ConfluenceAPI.create(config);

            var params = {
                status : 'current'
            };

            var request = {
                ancestors: [{
                    id : "1802243"
                }],
                body: {
                    "storage": {
                        "value": "<p>This page was created by RESTAPI. Creator: Sam.Li</p>",
                        "representation": "storage"
                      }
                },
                space: {
                    key : "TES"
                },
                status: "current",
                title: "This page was created at " + new Date(),
                type: "page"
            };

            confluenceAPI.content.createContent(params, request, function(err, data) {
                expect(err).to.be.null;
                expect(data).not.to.be.null;
                expect(data).to.be.an('object')
                expect(data.title).to.be.eq(request.title);
                expect(data.space.key).to.be.eq(request.space.key);
                expect(tempContentId=data.id).to.be.not.null;
                done();
            });
        });
    });

    describe('#getContentById', function(){
        it('should get content by id', function (done) {
            var confluenceAPI = ConfluenceAPI.create(config);

            var contentId = tempContentId;
            var params = {
                embeddedContentRender : "current",
                status: "current"
            };

            confluenceAPI.content.getContentById(contentId, params, function(err, data) {
                expect(err).to.be.null;
                expect(data).not.to.be.null;
                expect(data).to.be.an('object')
                expect(data.id).to.be.eq(contentId);
                expect(versionNum=data.version.number).not.to.be.lte(0);
                done();
            });
        });
    });

    describe('#updateContent', function(){
        it('should update content successfully', function (done) {
            var confluenceAPI = ConfluenceAPI.create(config);

            var contentId = tempContentId;
            var params = {
                conflictPolicy: "abort",
                status : 'current'
            };

            var request = {
                ancestors: [{
                    id : "1802243"
                }],
                body: {
                    "storage": {
                        "value": "<p>This page was updated by RESTAPI. Creator: Sam.Li</p><p>Updated at: " + new Date() + "</p>",
                        "representation": "storage"
                      }
                },
                space: {
                    key : "TES"
                },
                status: "current",
                title: "This page was updated at " + new Date(),
                type: "page",
                version: {
                    number: versionNum+1
                }
            };

            confluenceAPI.content.updateContent(contentId, params, request, function(err, data) {
                expect(err).to.be.null;
                expect(data).not.to.be.null;
                expect(data).to.be.an('object')
                expect(data.title).to.be.eq(request.title);
                expect(data.space.key).to.be.eq(request.space.key);
                done();
            });
        });
    });

    describe('#deleteContent', function(){
        it('should delete content by id', function (done) {
            var confluenceAPI = ConfluenceAPI.create(config);

            var contentId = tempContentId;

            confluenceAPI.content.deleteContent(contentId, null, function(err, data) {
                expect(err).to.be.null;
                expect(data).not.to.be.null;
                expect(data.code).to.be.eq(204);
                done();
            });
        });
    });

    describe('#getContentChildren', function(){
        it('should get content children by id', function (done) {
            var confluenceAPI = ConfluenceAPI.create(config);

            var contentId = "1802243";
            var params = {
                expand : "page"
            };

            confluenceAPI.content.getContentChildren(contentId, params, function(err, data) {
                expect(err).to.be.null;
                expect(data).not.to.be.null;
                expect(data).to.be.an('object')
                expect(data.page.results.length).to.be.gte(0);
                done();
            });
        });
    });

    describe('#getContentChildrenByType', function(){
        it('should get content children by id and child type', function (done) {
            var confluenceAPI = ConfluenceAPI.create(config);

            var contentId = "1802243";
            var type = "page";
            var params = {
                start : 0,
                limit: 3
            };

            confluenceAPI.content.getContentChildrenByType(contentId, type, params, function(err, data) {
                expect(err).to.be.null;
                expect(data).not.to.be.null;
                expect(data).to.be.an('object')
                expect(data.start).to.be.eq(params.start);
                expect(data.results.length).to.be.eq(data.size);
                done();
            });
        });
    });

    describe('#getAttachments', function(){
        it('should get content attachments by id', function (done) {
            var confluenceAPI = ConfluenceAPI.create(config);

            var contentId = "1802243";
            var params = {
                start : 0,
                limit: 3
            };

            confluenceAPI.content.getAttachments(contentId, params, function(err, data) {
                expect(err).to.be.null;
                expect(data).not.to.be.null;
                expect(data).to.be.an('object')
                expect(data.start).to.be.eq(params.start);
                expect(data.results.length).to.be.eq(data.size);
                done();
            });
        });
    });

    describe('#createAttachment', function(){
        it('should create content attachment for id', function (done) {
            var confluenceAPI = ConfluenceAPI.create(config);

            var contentId = "1802243";
            var params = {
                status: "current"
            };

            //create a new file as attachment
            var attachFileName = "./test/attachment-"+new Date().getTime()+".txt";
            fs.writeFile(attachFileName, 'This attachment is generated by test process', function(err) {
                if (err) {
                    throw err;
                }
                console.log(attachFileName + ' Saved.');
            });

            var form = {
                file : {
                    value:  fs.createReadStream(attachFileName),
                    options: {
                        filename: attachFileName,
                        contentType: 'text/plain'
                    }
                },
                comment: "Create attachment",
                minorEdit: 'false'
            };

            confluenceAPI.content.createAttachment(contentId, params, form, function(err, data) {
                fs.unlink(attachFileName,function (err) {
                    if(err) throw err;
                    console.log(attachFileName + ' deleted.')
                });
                
                expect(err).to.be.null;
                expect(data).not.to.be.null;
                expect(data).to.be.an('object')
                expect(data.results.length).to.be.eq(data.size);
                done();
            });
        });
    });

});