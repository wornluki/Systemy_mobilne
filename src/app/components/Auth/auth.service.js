(function () {
	'use strict';

		angular
			.module('web')
			.factory('Auth', Auth);

		Auth.$inject = ['$firebaseAuth'];
		// Utworzenie instancji Auth, utworzenie nowego obiektu
		function Auth($firebaseAuth) {
			return $firebaseAuth();
	 	}
})();
