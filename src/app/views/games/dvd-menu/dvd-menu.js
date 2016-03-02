(function(app) {
    'use strict';

	app.directive('dvdMenu', function() {
        return {
            restrict: 'EA',
			replace: true,
            templateUrl: 'app/views/games/dvd-menu/dvd-menu.tpl.html',
			controller: 'DvdMenuCtrl',
			controllerAs: 'dvdMenuCtrl',
			bindToController: true,
            scope: {
				theme: '='
            }
        };
    });

	app.controller('DvdMenuCtrl', function( $scope, $timeout, Games, CFG_DVDMENU ) {
		var dvdMenuCtrl = this;

		var currentPage = {
			index: 0,
			itemCount: 0,
			maxItemCount: 17,
			category: '',
			layout: {},
			data: []
		};

		// WATCHER(s)

		$scope.$watch(function() { return Games.filteredItems; }, reloadIfChanges, true);
		$scope.$watch('dvdMenuCtrl.theme', reloadIfChanges);

		// HANDLER(s)

		dvdMenuCtrl.getBannerForIndex = function(index) {
			return 'url("file:' + currentPage.data[index].iso.bannerPath() + '")';
		};

		dvdMenuCtrl.getCoverForIndex = function(index) {
			return 'url("file:' + currentPage.data[index].iso.frontCoverPath() + '")';
		};

		dvdMenuCtrl.previousPage = function() {
			goToPageIndex(currentPage.index - 1);
		};

		dvdMenuCtrl.nextPage = function() {
			goToPageIndex(currentPage.index + 1);
		};

		dvdMenuCtrl.currentPage = function() {
			return currentPage;
		};

		// HELPER(s)

		function reloadIfChanges(newValue, oldValue) {
			if( newValue !== oldValue ) {
				reload();
			}
		}

		function getDataForPageIndex(pageIndex) {
			var data = [];
			// Loop through each GROUP
			for( var groupIndex = 0, pos = 0; groupIndex < Games.filteredItems.length; groupIndex++ ) {
				var group = Games.filteredItems[groupIndex];
				currentPage.category = group.$label;
				// Loop through each GROUP ITEM
				for( var itemIndex = 0; itemIndex < group.length; itemIndex++, pos++ ) {
					var currentPageIndex = Math.floor(pos / currentPage.itemCount);
					if( currentPageIndex === pageIndex ) { data.push(group[itemIndex]); }
					// if we already found data in this group -> avoid looping til the end and exit
					else if( data.length > 0 ) { return data; }
				}
				// if we already found data in the previous group -> exit
				if( data.length > 0 ) { return data; }
				// if we ended with odd number in the previous group -> make it even
				if( pos % currentPage.itemCount ) { pos += 1; }
			}
			return data;
		}

		function goToPageIndex(index) {
			currentPage.index = index;
			currentPage.data = getDataForPageIndex(index);
			currentPage.isLast = ((index * currentPage.itemCount) >= (Games.filteredItems.$total - 1));
		}

		function getStyleSheet() {
			return $timeout(function() {
				return angular.element(document.querySelector('#gallery link'))[0].sheet;
			});
		}

		function addLayoutPart(rule, part, forItem) {
			var result = rule.match(new RegExp('#gallery.dvdmenu .' + part + '(\\d+)'));
			if( result !== null ) {
				var index = result[1];
				currentPage.layout[part] = currentPage.layout[part] || [];
				currentPage.layout[part].push(index);
				if( forItem ) {
					currentPage.itemCount = Math.max(currentPage.itemCount, ++index);
				}
				return true;
			}
			return false;
		}

		function reload() {
			// Get the theme stylesheet
			getStyleSheet().then(function(sheet) {
				if( sheet !== null ) {
					currentPage.scene = angular.element(document.querySelector('.dvdmenu span.scene'));

					// Loop through each css rule and build a layout object
					currentPage.layout = [];
					var cssRules = (sheet.rules) ? sheet.rules : sheet.cssRules;
					for( var i = 0; i < cssRules.length; i++ ) {
						var rule = cssRules[i].selectorText;
						if( addLayoutPart(rule, 'cover', true) ) { continue; }
						else if( addLayoutPart(rule, 'banner', true) ) { continue; }
						else if( addLayoutPart(rule, 'title') ) { continue; }
						else if( addLayoutPart(rule, 'developer') ) { continue; }
						else if( addLayoutPart(rule, 'publisher') ) { continue; }
						else if( addLayoutPart(rule, 'release-date') ) { continue; }
						else if( addLayoutPart(rule, 'image') ) { continue; }
						else if( addLayoutPart(rule, 'shape') ) { continue; }
						else if( addLayoutPart(rule, 'category') ) { continue; }
					}

					// Reload current page
					goToPageIndex(currentPage.index);
				}
			});
		}
		reload();
	});

}(angular.module('xbw.games.dvd-menu', [
])));
