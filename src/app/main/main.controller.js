(function () {
  'use strict';
    angular
      .module('web')
      .controller('MainController', MainController);

      MainController.$inject = ['$scope', '$firebaseArray', '$state', 'Auth'];
      function MainController($scope, $firebaseArray, $state, Auth) {

        var vm = this;
        // auth();
        // vm.selectAction2 = selectAction2;
        // vm.addItem = addItem;
        // vm.select = "Lista1";
        // vm.lists = listService.getListsByUser(currentAuth.uid);
        // vm.items = $firebaseArray(firebaseDataService.lists.child(vm.select).child('items'));
        // vm.addList = addList;
        vm.logout = logout;
        //
        //
        // ////////// Functions //
        //
        // function selectAction2(select, event) {
        //   vm.items = $firebaseArray(firebaseDataService.lists.child(select).child('items'));
        //   vm.select = select;
        // };
        //
        // function addItem() {
        //   var iRef = listService.getItemsRef(vm.select);
        //
        //   iRef.child($scope.nameText).set({
        //     name: $scope.nameText,
        //     addedByUser: currentAuth.password.email,
        //     completed: false
        //   })
        //
        //   $scope.nameText = "";
        // };
        //
        // function addList() {
        //   firebaseDataService.lists.child($scope.nameListText).set({
        //     name: $scope.nameListText,
        //     items: []
        //   });
        //   firebaseDataService.users.child(currentAuth.uid).child('lists').child($scope.nameListText).set(true);
        //   $scope.nameListText = "";
        // };
        //
        function logout() {
          Auth.$signOut();
          $state.go('login');
        }
        //
        // function auth() {
        //   $scope.auth = Auth;
        //  $scope.auth.$onAuth(function(authData) {
        //     $scope.authData = authData;
        //   });
        // };
        vm.user = Auth.$getAuth();

        if (vm.user) {
          console.log("Signed in as:", vm.user);
        } else {
          console.log("Signed out");
        }


      }
  })();
