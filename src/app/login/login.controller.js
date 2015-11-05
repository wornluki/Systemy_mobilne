(function() {
  'use strict';
    angular
      .module('web')
      .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController($scope, $state, Auth) {


      $scope.loginUser = function() {
        Auth.$authWithPassword({
          email: $scope.email,
          password: $scope.password
        }).then(function(user) {
          console.log("Logged in as:", user.password.email);
          $state.go('home');
        }).catch(function(error) {
          console.error("Authentication failed:", error);
        });
      };
    }
  })();
