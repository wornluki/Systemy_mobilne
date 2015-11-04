
  angular
    .module('web')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $firebaseArray) {

    var ref = new Firebase("hhttps://vivid-torch-6869.firebaseio.com");
    
    $scope.items = $firebaseArray(ref);
    // add new items to the array
    // the message is automatically added to our Firebase database!
    $scope.addItem = function() {
      $scope.items.$add({
        name: $scope.nameText,
        quanity: $scope.quanityText
      });
    };
}
