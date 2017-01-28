'use strict';

//admin controller
function AdminCtrl ($scope, $location, storageService, $routeParams, $rootScope) {

  //logOut function that call storageService method logOut and set path to root
  $scope.logOut = function () {
    storageService.logOut();
    $location.path('');
  };

  //loggedUser variable on $scope with value of storageService method getLoggedUser
  $scope.loggedUser = storageService.getLoggedUser();

  //users variable on $scope with all users in localStorage
  $scope.users = storageService.getAllUsers();

  //viewUser function that puts the user at rootescope to be equal to user with same id
  $scope.viewUser = function (id) {
    $rootScope.user = storageService.getUserById(id);
    $location.path('/viewUser/' + id);
  };

  //editUser function that change data of input user
  $scope.editUser = function (user) {
   storageService.changeData(user, $rootScope.user.id);
   $location.path('/viewUser/' + $rootScope.user.id);
  };

};
