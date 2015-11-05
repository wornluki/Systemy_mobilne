(function() {
  'use strict';
    angular
      .module('web')
      .controller('RegisterController', RegisterController);

    /** @ngInject */
    function RegisterController($scope, $state, $location, Auth) {

      var ref = new Firebase("https://vivid-torch-6869.firebaseio.com/");
      var usersRef = ref.child('users');

      console.log(usersRef)

      $scope.registerUser = function() {
        $scope.error = null;

        // Auth.$onAuth(function(authData) {
        //   if (authData) {
        //     Auth.$child('users').$child(authData.uid).$set({
        //       provider: authData.provider,
        //       name: authData.password.email.replace(/@.*/, '')
        //     });
        //   };
        // });

        Auth.$createUser({
          email: $scope.email,
          password: $scope.password
        }).then(function(user) {
          // console.log(user)
          usersRef.child(user.uid).set({
            id: $scope.email.replace(/@.*/, ''),
            email: $scope.email
          });
          console.log(user)
          $state.go("home");
        }).catch(function(error) {
          $scope.error = error;
          console.log(error);
        });
       };
      
    }
  })();