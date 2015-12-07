(function(app) {
    'use strict';

    app.directive('filePicker', function( $timeout ) {
        return {
            restrict: 'EA',
            templateUrl: 'app/components/file-picker/file-picker.tpl.html',
            scope: {
                ngModel: '='
            },
            link: function( scope, el, attrs ) {
                var button = el.find('button');
                var input = el.find('input');
                var timer = null;

                input.change(function(e) {
                    scope.ngModel = e.target.files[0].path;
                    scope.$apply();
                });

                button.click(function() {
                    //timer = $timeout(function() {
                        input[0].click();
                    //}, 450);
                });

                scope.$on('$destroy', function() {
                    input.off('change');
                    button.off('click');
                    $timeout.cancel(timer);
                });
            }
        };
    });

}(angular.module('xbw.filepicker', [
])));
