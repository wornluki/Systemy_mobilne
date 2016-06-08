(function() {
  'use strict';
    angular
      .module('web')
      .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController($scope, $state, Auth) {

      var email = $scope.email
      var password = $scope.password
      // logowanie przy użyciu adresu email po rejestracji
      $scope.loginUser = function() {
        Auth.$signInWithEmailAndPassword(email, password).then(function(user) {
          console.log("Logged in as:", user );
          $scope.user = user;
          $state.go('home');
        }).catch(function(error) {
          console.error("Authentication failed:", error);
        });
      };
      // Logowanie przy użyciu zewnętrznego providera
      $scope.loginWithGoogle = function() {
        Auth.$signInWithPopup("google").then(function(user) {
          console.log("Logged is as: ", user.uid);
          $state.go('home');
        })
      };
      $scope.loginWithGitHub = function() {
        Auth.$signInWithPopup("github").then(function(user) {
          console.log("Logged is as: ", user.uid);
          $state.go('home');
        })
      };
    }
  })();
