'use strict';

//storageService function
function storageService (adminProviderService) {

  var storageService = {};
  var users = [];

  //storageService method that return array of all users in localStorage
  storageService.getAllUsers = function () {
    var usersAll = [];
    for (var i = 0; i<localStorage.length; i++) {
      var user = JSON.parse(localStorage.getItem(localStorage.key(i)));
      usersAll.push(user);
    }
    return usersAll;
  };

  //storageService method that set users array to all data from localStorage
  storageService.refreshUser = function () {
     users = storageService.getAllUsers();
  };

  /*
  storageService method that set key admin_luka in localStorage
  and have value of admin from adminProviderService
  */
  storageService.setAdmin = function () {
    var admin = new adminProviderService().getAdmin();
    localStorage.setItem('superAdmin', JSON.stringify(admin));
  };

  /*
  storageService method that take user information and store them in localStorage,
  key value is length of localStorage + 1
  */
  storageService.registerData = function (user) {
    var date = new Date(Date.now());
    user.dateOfReg = date;
    user.dateOfLastMod = date;
    user.isAdmin = false;
    user.id = Math.round(Math.random()*1000);
    localStorage.setItem(localStorage.length+1, JSON.stringify(user));
    storageService.refreshUser();
  };

  /*
  storageService method checks that the entered email and password exist in localStorage,
  if they exsit return that user from localStorage, if not return null
  */
  storageService.isLogedIn = function (user) {
    storageService.refreshUser();
    for (var i = 0; i <= users.length-1; i++) {
      if (users[i].email === user.email && users[i].password === user.password) {
          return users[i];
      }
    }
    return null;
  };

  /*
  storageService method storeUserInSession take user and store their information in sessionStorage,
  with key value logedUser
  */
  storageService.storeUserInSession = function (user) {
    var logedUser = JSON.stringify(user);
    sessionStorage.setItem('logedUser', logedUser);
  };

  /*
  storageService method that take infromation from sessionStorage with key value logedUser,
  and return them
  */
  storageService.getLoggedUser = function () {
    var data = JSON.parse(sessionStorage.getItem('logedUser'));
    return data;
  };

  //storageService method that empty sessionStorage
  storageService.logOut = function () {
    sessionStorage.clear();
  };

  /*
  storageService method that take new values(newUser) of user and id of user, then find
  user with same id, and replace his data with new date from newUser
  */
  storageService.changeData = function (newUser, id) {
    for (var i = 0; i <= users.length-1; i++) {
      if (id === users[i].id ) {
            users[i].dateOfLastMod = new Date(Date.now());
            users[i].name = newUser.name;
            users[i].email = newUser.email;
            users[i].password = newUser.password;
            users[i].surname = newUser.surname;
            localStorage.setItem(localStorage.key(i), JSON.stringify(users[i]));
      }
    };

  };

  /*
  storageService method that take id and find user with same id in localStorage, and then
  return that user
  */
  storageService.getUserById = function (id) {
      for (var i = 0; i<= users.length-1; i++) {
        if (users[i].id === id) {
          return users[i];
        }
      };
  };

  return storageService;
};
