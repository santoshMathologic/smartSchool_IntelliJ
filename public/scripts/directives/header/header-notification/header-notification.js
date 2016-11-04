'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('smartAdminApp')
	.directive('headerNotification',function() {
		return {
			templateUrl: 'scripts/directives/header/header-notification/header-notification.html',
			restrict: 'E',
			replace: true,
			controller : function($scope, $state, $location, UserAuthFactory) {
				$scope.logout = function() {
					UserAuthFactory.logout();
					$state.go('login', {}, { reload: true });
				};

			}
		}


	});


