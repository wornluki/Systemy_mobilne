(function() {
  'use strict';

  angular
    .module('web')
    .run(stateChangeError);

  /** @ngInject */
  // function runBlock($log) {

  //   $log.debug('runBlock end');
  // }

  function stateChangeError($rootScope, $state) {
	$rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
	  // We can catch the error thrown when the $requireAuth promise is rejected
	  // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
	    $state.go("login");
    }
	});
  }

})();
