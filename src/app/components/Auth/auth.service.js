(function() {
  'use strict';

  angular
    .module('web')
	.factory('Auth', Auth);

  function Auth($firebaseAuth) {
    var ref = new Firebase("https://vivid-torch-6869.firebaseio.com/");
    return $firebaseAuth(ref);
  }
})();