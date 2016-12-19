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
        vm.listBalance = 0;
        vm.cost = 0;
        vm.addBalance = addBalance;
        
       

        vm.user.$bindTo($scope, "data").then(function() {
          console.log($scope.data.balance.balance); 
          vm.balance = $scope.data.balance.balance
        });
         
        //
        //
        // ////////// Functions //
        function selectAction2(select, event) {
          vm.items = $firebaseArray(firebaseDataService.lists.child(select).child('items'));
          //vm.listBalance = $firebaseObject(firebaseDataService.lists.child(select));
          console.log(vm.items);
          // vm.listBalance = $firebaseArray(firebaseDataService.lists.child(select).child('items'));
          vm.select = select;
          vm.stateActive = select;
        };

        function addBalance() {
          var balance = $scope.balanceText;
          balance = parseFloat($scope.data.balance.balance) + parseFloat(balance);
          var listRef = firebaseDataService.users.child(currentAuth.uid);
          listRef.child('balance').set({
            balance: balance
          })
          $scope.balanceText = "";
        }
      

        function addItem() {
          var iRef = listService.getItemsRef(vm.select);
          iRef.child($scope.nameText).set({
            name: $scope.nameText,
            addedByUser: currentAuth.email,
            completed: false,
            cost: $scope.cost
          })
          
          $scope.data.balance.balance =  $scope.data.balance.balance- $scope.cost;
          console.log(vm.balance)

          firebaseDataService.users.child(currentAuth.uid).child('balance').set({
            balance: $scope.data.balance.balance
          })

          $scope.nameText = "";
          $scope.cost = "";
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
