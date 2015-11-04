(function() {
  'use strict';
    angular
      .module('web')
      .controller('MainController', MainController);

    /** @ngInject */
    function MainController($scope, $firebaseArray, currentAuth, Auth) {

      var ref = new Firebase("hhttps://vivid-torch-6869.firebaseio.com");
      
      $scope.items = $firebaseArray(ref);

      $scope.addItem = function() {
        $scope.items.$add({
          name: $scope.nameText,
          quanity: $scope.quanityText
        });
      };

      $scope.auth = Auth;
      $scope.auth.$onAuth(function(authData) {
        $scope.authData = authData;
      });
      
    }
  })();
