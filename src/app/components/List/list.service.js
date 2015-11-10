(function () {
  'use strict';

  angular
    .module('web')
    .factory('listService', listService);

  listService.$inject = ['$firebaseArray', 'firebaseDataService'];

  function listService($firebaseArray, firebaseDataService) {

    var service = {
      getListsByUser: getListsByUser
      // Party: Party
    };

    return service;

    ////////////

    function getListsByUser(uid) {

      
      var userRef = firebaseDataService.users.child(uid).child('lists');
      var vm = [];
      userRef.on('child_added', function(snapshot) {
        var listKey = snapshot.key();
        firebaseDataService.lists.child(listKey).once('value', function(snapshot) {     
          var a = snapshot.val();    
          vm.push(a);
        })    
      });
 
      return vm;
      console.log(vm);

      // return $firebaseArray(firebaseDataService.users.child(uid).child('lists'));
    }

    // function Party() {
    //   this.name = '';
    //   this.phone = '';
    //   this.size = '';
    //   this.done = false;
    //   this.notified = false;
    // }
  }

})();