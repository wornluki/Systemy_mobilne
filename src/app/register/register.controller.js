(function() {
  'use strict';
    angular
      .module('web')
      .controller('RegisterController', RegisterController);

    /** @ngInject */
    function RegisterController($scope, $state, $location, Auth) {

      $scope.registerUser = function() {
        $scope.error = null;

        Auth.$createUser({
          email: $scope.email,
          password: $scope.password
        }).then(function() {
          $state.go("login");
        }).catch(function(error) {
          $scope.error = error;
          console.log(error);
        });
       };
      
    }
  })();