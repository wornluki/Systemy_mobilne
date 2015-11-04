(function() {
  'use strict';
    angular
      .module('web')
      .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController($scope, $location, Auth) {


      $scope.loginUser = function() {
        Auth.$authWithPassword({
          email: $scope.email,
          password: $scope.password
        }).then(function(authData) {
          console.log("Logged in as:", authData.password.email);
          isLoggedIn: true;
          $location.path('/');
        }).catch(function(error) {
          console.error("Authentication failed:", error);
        });
      };
    }
  })();
