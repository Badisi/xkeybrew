(function(app) {
    'use strict';

    var path = require('path');
    var fs = require('fs');

    app.factory('IsoVO', function( CFG_PATHS, CFG_URLS, Worker ) {
        function IsoVO(data) {
            var defaults = {
                hash: null,
                gameId: null,
                mediaId: null,
                discNumber: 1,
                filePath: null,
                selected: true,
                loaded: true,
                abgxVerified: false,
                bannerSource: 0,
                frontCoverSource: 0
            };
            angular.extend(this, defaults, data);
        }

        IsoVO.prototype = {
            filename: function() {
                return path.basename(this.filePath);
            },
            frontCoverPath: function() {
                return path.join(CFG_PATHS.images, this.hash + '-FrontCover.png');
            },
            bannerPath: function() {
                return path.join(CFG_PATHS.images, this.hash + '-Banner.png');
            },
            screenshotPath: function() {
                return path.join(CFG_PATHS.images, this.hash + '-Screenshot.png');
            },
            updateInfos: function() {
                var self = this;
                var workers = [];

                var addToWorkers = function(path, url) {
                    if( !fs.existsSync(path) ) {
                        workers.push(Worker.saveImage(url, path));
                    }
                };

                var end = function() {
                    delete self.isUpdating;
                };

                var start = function() {
                    self.isUpdating = true;

                    addToWorkers(
                        self.screenshotPath(),
                        CFG_URLS.screenshotUrl.replace('%titleid%', self.titleId)
                    );
                    addToWorkers(
                        self.frontCoverPath(),
                        CFG_URLS.frontCoverUrls[self.frontCoverSource].url.replace('%titleid%', self.titleId)
                    );
                    addToWorkers(
                        self.bannerPath(),
                        CFG_URLS.bannerUrls[self.bannerSource].url.replace('%titleid%', self.titleId)
                    );
                };
                start();

                return Q.all(workers).then(end).fail(end);
            },
            isInfosComplete: function() {
                return fs.existsSync(this.screenshotPath()) &&
                       fs.existsSync(this.frontCoverPath()) &&
                       fs.existsSync(this.bannerPath());
            }
        };

        // Helper(s)
        IsoVO.create = function(item) {
            return new IsoVO(item);
        };

        IsoVO.fromArray = function(items) {
            if( angular.isArray(items) ) {
                return items.map(IsoVO.create).filter(Boolean);
            }
            return IsoVO.create(items);
        };

        return IsoVO;
    });

}(angular.module('xbw.iso', [
])));
