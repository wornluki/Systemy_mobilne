(function() {
  'use strict';
    angular
      .module('web')
      .controller('MainController', MainController);

    /** @ngInject */
    function MainController($scope, $firebaseArray, $state, currentAuth, Auth) {

      var ref = new Firebase("hhttps://vivid-torch-6869.firebaseio.com");
      var listRef = ref.child('lists');
      $scope.select = "Lista1";
      var itemsRef = ref.child('lists').child($scope.select).child('items');

      $scope.selectAction = function () {
        itemsRef = ref.child('lists').child($scope.select).child('items');
        console.log($scope.select);
        console.log('Ref: '+ itemsRef);
        $scope.items = $firebaseArray(itemsRef);
      }
      
      
      

            
      $scope.items = $firebaseArray(itemsRef);
      $scope.lists = $firebaseArray(listRef);

      // var listRef = ref.child('lists/'+select+'/items');
      // $scope.selectAction = function() {
      //     console.log($scope.select);
      // };



      $scope.addItem = function() {
        // $scope.items.$add({
        //   name: $scope.nameText,
        //   quanity: $scope.quanityText
        // });
        console.log(itemsRef);
        console.log($scope.select);
        itemsRef.child($scope.nameText).set({
          name: $scope.nameText,
          quanity: $scope.quanityText
        })

        $scope.nameListText = "";
        $scope.nameText = "";
        $scope.quanityText = "";
      };

      $scope.addList = function() {
        listRef.child($scope.nameListText).set({
          name: $scope.nameListText,
          items: []
        });
        $scope.nameListText = "";
      };

      $scope.auth = Auth;
      $scope.auth.$onAuth(function(authData) {
        $scope.authData = authData;
      });

      $scope.logout = function() {
        Auth.$unauth()
        $state.go('login')
      }
      
    }
  })();
