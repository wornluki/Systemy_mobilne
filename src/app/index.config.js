(function() {
  'use strict';

  angular
    .module('web')
    .config(config);

  /** @ngInject */
  function config() {
    var config = {
      apiKey: "AIzaSyDY63mIxJRuSXTEOoKL_yYnl1wOuP6Xi0Y",
      authDomain: "vivid-torch-6869.firebaseapp.com",
      databaseURL: "https://vivid-torch-6869.firebaseio.com",
      storageBucket: "vivid-torch-6869.appspot.com",
    };
    firebase.initializeApp(config);
  }

})();
