'use strict';

//user controller
function UserCtrl ($scope, $location, storageService) {

  //loggedUser variable on $scope with value of storageService method getLoggedUser
  $scope.loggedUser = storageService.getLoggedUser();

  //user variable on $scope with data of loggedUser
  $scope.user = storageService.getUserById($scope.loggedUser.id);

  //logOut function that call storageService method logOut and set path to root
  $scope.logOut = function () {
    storageService.logOut();
    $location.path('');
  };

  //editUser function that change data of input user
  $scope.editUser = function (user) {
    storageService.changeData(user, $scope.loggedUser.id);
    $location.path('/myProfile');
  };

};
