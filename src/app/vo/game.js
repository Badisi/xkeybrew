(function(app) {
    'use strict';

    app.factory('GameVO', function( CFG_URLS, Worker, Utils ) {
        function GameVO(data) {
            var defaults = {
                titleId: null,
                regions: null,
                discCount: 1,
                title: '',
                overview: null,
                originalReleaseDate: null,
                developer: null,
                publisher: null,
                genre: null,
                rating: 0,
                tags: []
            };
            angular.extend(this, defaults, data);
        }

        GameVO.prototype = {
            updateInfos: function() {
                var self = this;
                var url = CFG_URLS.marketplace.replace('%titleid%', self.titleId);

                self.isUpdating = true;
                return Worker.getWebInfos(url)
                    .then(function(webInfos) {
                        angular.extend(self, webInfos);
                        delete self.isUpdating;
                    })
                    .fail(function(err) {
                        delete self.isUpdating;
                    });
            },
            isInfosComplete: function() {
                return  Utils.isEmpty(this.title) &&
                        Utils.isEmpty(this.overview) &&
                        Utils.isEmpty(this.originalReleaseDate) &&
                        Utils.isEmpty(this.developer) &&
                        Utils.isEmpty(this.publisher) &&
                        Utils.isEmpty(this.genre);
            }
        };

        // Helper(s)
        GameVO.create = function(item) {
            return new GameVO(item);
        };

        GameVO.fromArray = function(items) {
            if( angular.isArray(items) ) {
                return items.map(GameVO.create).filter(Boolean);
            }
            return GameVO.create(items);
        };

        return GameVO;
    });

}(angular.module('xbw.game', [
])));
