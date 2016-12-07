(function () {
  'use strict';

  angular
    .module('web')
    .factory('firebaseDataService', firebaseDataService);

  firebaseDataService.$inject = ['FIREBASE_URL'];

  function firebaseDataService(FIREBASE_URL) {
    var root = firebase.database().ref();

    var service = {
      root: root,
      users: root.child('users'),
      lists: root.child('lists'),
    };
    return service;
  }



})();