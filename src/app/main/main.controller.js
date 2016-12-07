(function () {
  'use strict';
    angular
      .module('web')
      .controller('MainController', MainController);


      MainController.$inject = ['$scope', '$firebaseObject', '$firebaseArray', '$state', 'Auth', 'listService', 'currentAuth', 'firebaseDataService', 'Auth'];
      function MainController($scope, $firebaseObject, $firebaseArray,  $state, Aut, listService, currentAuth, firebaseDataService, Auth) {

        var vm = this;

        vm.selectAction2 = selectAction2;
        vm.addItem = addItem;
        vm.select = "Lista1";
        vm.lists = listService.getListsByUser(currentAuth.uid) || [];
        vm.items = $firebaseArray(firebaseDataService.lists.child(vm.select).child('items'))
        vm.user = $firebaseObject(firebaseDataService.users.child(currentAuth.uid))
        vm.addList = addList;
        vm.logout = logout;
        vm.stateActive = '';
        vm.balance = 0;
        vm.cost = 0;
        console.log()
       

        vm.user.$bindTo($scope, "data").then(function() {
          console.log($scope.data); 
          vm.balance = $scope.data.balance
        });
         
        //
        //
        // ////////// Functions //
        function selectAction2(select, event) {
          vm.items = $firebaseArray(firebaseDataService.lists.child(select).child('items'));
          
          vm.select = select;
          vm.stateActive = select;
        };
      

        function addItem() {
          var iRef = listService.getItemsRef(vm.select);
          console.log(currentAuth.email);
          iRef.child($scope.nameText).set({
            name: $scope.nameText,
            addedByUser: currentAuth.email,
            completed: false,
            cost: $scope.cost
          })
          
          vm.cost = vm.cost + parseFloat($scope.cost)
          $scope.nameText = "";
          $scope.cost = "";
          $scope.data.balance = parseFloat($scope.data.balance) - parseFloat($scope.cost);
        };
        
        function addList() {
          firebaseDataService.lists.child($scope.nameListText).set({
            name: $scope.nameListText,
            items: []
          });
          firebaseDataService.users.child(currentAuth.uid).child('lists').child($scope.nameListText).set(true);
          $scope.nameListText = "";
        };
        //
        function logout() {
          Auth.$signOut();
          $state.go('login');
        };
        //
        // function auth() {
        //   $scope.auth = Auth;
        //   $scope.auth.$onAuth(function(authData) {
        //     $scope.authData = authData;
        //   });
        // };
        vm.user = Auth.$getAuth();

        if (vm.user) {
          //console.log("Signed in as:", vm.user);
        } else {
          console.log("Signed out");
        }
      }
  })();
