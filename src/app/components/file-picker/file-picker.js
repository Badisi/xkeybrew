(function(app) {
    'use strict';

    app.directive('filePicker', function() {
        return {
            restrict: 'EA',
            templateUrl: 'app/components/file-picker/file-picker.tpl.html',
            scope: {
                ngModel: '='
            },
            link: function( scope, el, attrs ) {
                var button = el.find('button');
                var input = el.find('input');

                input.on('change', function(e) {
                    scope.ngModel = e.target.files[0].path;
                    scope.$apply();
                });

                button.on('click', function() {
                    input[0].click();
                });

                scope.$on('$destroy', function() {
                    input.off('change');
                    button.off('click');
                });
            }
        };
    });

}(angular.module('xbw.filepicker', [
])));
