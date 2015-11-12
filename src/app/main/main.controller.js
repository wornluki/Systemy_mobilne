(function () {
  'use strict';
    angular
      .module('web')
      .controller('MainController', MainController);

      MainController.$inject = ['$scope', '$firebaseArray', '$state', 'firebaseDataService', 'listService', 'currentAuth', 'Auth'];
      function MainController($scope, $firebaseArray, $state, firebaseDataService, listService, currentAuth, Auth) {

        var vm = this;

        vm.selectAction = selectAction;
        vm.addItem = addItem;
        vm.select = "Lista1";
        vm.lists = listService.getListsByUser(currentAuth.uid);
        vm.items = $firebaseArray(firebaseDataService.lists.child(vm.select).child('items'));
        
        console.log(vm.lists)

        var ref = new Firebase("hhttps://vivid-torch-6869.firebaseio.com");
        var listRef = ref.child('lists');
        $scope.select = "Lista1";
        var itemsRef = ref.child('lists').child($scope.select).child('items');
        var userRef = ref.child('users/'+currentAuth.uid+'/lists');
        $scope.lists = [];
        $scope.items = $firebaseArray(itemsRef);

        // // Working code
        // userRef.on('child_added', function(snapshot) {
        //   var listKey = snapshot.key();
        //   listRef.child(listKey).once('value', function(snapshot) {     
        //     var a = snapshot.val();
        //     $scope.lists.push(a);
        //   });  
        // });


        //////////


        function selectAction() {
          itemsRef = ref.child('lists').child($scope.select).child('items');
          $scope.items = $firebaseArray(itemsRef);

        };

        function addItem() {

          itemsRef.child($scope.nameText).set({
            name: $scope.nameText,
            quanity: $scope.quanityText
          });

          $scope.nameListText = "";
          $scope.nameText = "";
          $scope.quanityText = "";
        };

        $scope.addList = function() {
          listRef.child($scope.nameListText).set({
            name: $scope.nameListText,
            items: []
          });
          userRef.child($scope.nameListText).set(true);
          $scope.nameListText = "";

        };

        $scope.auth = Auth;
        $scope.auth.$onAuth(function(authData) {
          $scope.authData = authData;
        });

        $scope.logout = function() {
          Auth.$unauth();
          $state.go('login');
        };
        
      }
  })();
