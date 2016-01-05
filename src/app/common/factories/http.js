(function(app) {
    'use strict';

    app.factory('Http', function( $http, $q ) {
        var basePath = ''; //http://domain.com/api/path';

        function makeRequest(method, uri, data) {
            var defer = $q.defer();
            method = method.toLowerCase();

            var httpArgs = [basePath + uri];
            if( method.match(/post|put/) ) {
                httpArgs.push(data);
            }

            $http[method].apply(null, httpArgs)
                .success(function(data, status) {
                    defer.resolve(data);
                })
                .error(function(data, status) {
                    defer.reject('HTTP Error: ' + status);
                });

            return defer.promise;
        }

        return {
            get: function(uri) {
                return makeRequest('get', uri);
            },
            post: function(uri, data) {
                return makeRequest('post', uri, data);
            },
            put: function(uri, data) {
                return makeRequest('put', uri, data);
            },
            delete: function(uri){
                return makeRequest('delete', uri);
            }
        };
    });

}(angular.module('xbw.http', [
])));
