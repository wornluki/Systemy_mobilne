(function () {
  'use strict';
    angular
      .module('web')
      .controller('MainController', MainController);

      MainController.$inject = ['$scope', '$firebaseArray', '$state', 'listService', 'currentAuth', 'Auth'];
      function MainController($scope, $firebaseArray, $state, listService, currentAuth, Auth) {

        var ref = new Firebase("hhttps://vivid-torch-6869.firebaseio.com");
        var listRef = ref.child('lists');
        $scope.select = "Lista1";
        var itemsRef = ref.child('lists').child($scope.select).child('items');
        var userRef = ref.child('users/'+currentAuth.uid+'/lists');
        $scope.lists = [];
        $scope.items = $firebaseArray(itemsRef);

        // Working code
        userRef.on('child_added', function(snapshot) {
          var listKey = snapshot.key();
          listRef.child(listKey).once('value', function(snapshot) {     
            var a = snapshot.val();
            $scope.lists.push(a);
          })    
        });

        $scope.selectAction = function () {
          itemsRef = ref.child('lists').child($scope.select).child('items');
          $scope.items = $firebaseArray(itemsRef);

        };

        $scope.addItem = function() {

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
