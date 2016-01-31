(function () {
  'use strict';

  angular
    .module('web')
    .factory('listService', listService);

  listService.$inject = ['$firebaseArray', 'firebaseDataService'];

  function listService($firebaseArray, firebaseDataService) {

    var service = {
      getListsByUser: getListsByUser,
      getItemsRef: getItemsRef
    };

    return service;

    ////////////

    function getListsByUser(uid) {
      var userRef = firebaseDataService.users.child(uid).child('lists');
      var vm = [];
      userRef.on('child_added', function(snapshot) {
        var listKey = snapshot.key();
        firebaseDataService.lists.child(listKey).once('value', function(snapshot) {
          var a = snapshot.exportVal();
          //console.log(a["name"])
          vm.push(a["name"]);
        })
      });
      return vm;
    }

    function getItemsRef(select) {
      return firebaseDataService.lists.child(select).child('items');
    }
  }

})();
