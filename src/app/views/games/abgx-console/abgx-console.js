(function(app) {
    'use strict';

	// Factory
	app.factory('AbgxConsole', function( $mdBottomSheet ) {
		return {
			show: function(files, callback) {
				return $mdBottomSheet.show({
	                templateUrl: 'app/views/games/abgx-console/abgx-console.tpl.html',
	                controller: 'AbgxConsoleCtrl',
	                controllerAs: 'abgxConsoleCtrl',
	                bindToController: true,
	                locals: { files:files }
	            }).then(callback, callback);
			}
		};
	});

    // Controller
    app.controller('AbgxConsoleCtrl', function( $scope, $document, $timeout, $mdBottomSheet, Config, Worker, files ) {
        var abgxConsoleCtrl = this;

        var timer = null;
        var iframeEl = null;
        var iframeWin = null;
        var iframeDoc = null;

        // HANDLER(s)

        abgxConsoleCtrl.hide = function() {
            $timeout.cancel(timer);
            stopWorker();
            $mdBottomSheet.hide();
        };

        // HELPERS(s)

        function sanitize(str) {
            return str.split(' ').join('&nbsp;');
        }

        function abortWorker() {
            Worker.abort();
            $timeout.cancel(timer);
            stopWorker();
        }

        function stopWorker() {
            if( iframeEl ) { iframeDoc.close(); }
            abgxConsoleCtrl.isLoading = false;
            iframeEl = null;
            iframeWin = null;
            iframeDoc = null;
            timer = null;
        }

        function startWorker() {
            if( iframeEl ) {
                var placeholderEl = null;

                abgxConsoleCtrl.isLoading = true;
                iframeDoc.open();

                var end = function() {
                    stopWorker();
                    $scope.$apply();
                };
                Worker.verifiedWithAbgx360(files, Config.prefs.abgxOptions.split(' '))
                    .progress(function(data) {
						if( iframeDoc && iframeWin ) {
                            if( data.indexOf('<placeholder>') !== -1 ) {
                                if( placeholderEl === null ) {
                                    // Write placceholder in the dom
                                    iframeDoc.write(sanitize(data));

                                    // Keep a reference to the placeholder for later use
                                    var items = iframeDoc.getElementsByTagName('placeholder');
                                    placeholderEl = items[items.length - 1];
                                } else {
                                    placeholderEl.innerHTML = sanitize(data.substring('<placeholder>'.length, data.length - '</placeholder>'.length));
                                }
                            } else if( (data !== '\b') && (data !== ' ') ) {
                                if( placeholderEl ) {
                                    placeholderEl = null;
                                }
                                iframeDoc.write(data);
                            }
                            iframeWin.scrollTo(0, 999999);
                        }
                    })
                    .then(end)
                    .fail(end);
            }
        }

        // DESTRUCTOR

        $scope.$on('$destroy', abortWorker);

        // CONSTRUCTOR

        (function() {
            // Delay it as iframe is not yet accessible in dom
            timer = $timeout(function() {
                iframeEl = document.getElementById('iframe');
                iframeWin = iframeEl.contentWindow;
                iframeDoc = iframeEl.contentDocument;
                startWorker();
            }, 0);
        })();
    });

}(angular.module('xbw.games.abgx-console', [
])));
