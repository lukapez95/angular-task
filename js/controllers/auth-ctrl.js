'use strict';

// authentication controller
function AuthCtrl($scope, $location, storageService) {

  var user = {
    name: '',
    surname: '',
    email: '',
    password: ''
  };

  storageService.setAdmin();

  var users = storageService.getAllUsers();

  //singUp function that take user and send it to registerData method
  $scope.singUp = function (user) {
    storageService.registerData(user);
  };

  //login fucntion that send user to isLogedIn method and check if user is admin
  $scope.login = function (user) {

    if (storageService.isLogedIn(user)) {
      var user = storageService.isLogedIn(user);
      storageService.storeUserInSession(user);

      if (user.isAdmin) {
        $location.path('/adminPanel');
      } else {
        $location.path('/myProfile');
      }
    } else {
      alert('Wrong email or password');
    }
  };

};
