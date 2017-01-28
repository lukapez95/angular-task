/*
Main angular module named myApp, dependency injection ngRoute
*/

var app = angular.module('myApp', ["ngRoute"]);

/*
resolvers that block entry on some page if user is not logged in,
also block going on admin pages if user is not admin, and going on user page if user is admin
*/
var resolveAdmin = {
  auth: ["$q", "storageService", '$location', function($q, storageService, $location) {
  var userInfo = storageService.getLoggedUser();
  var deferred = $q.defer();

    if (userInfo && userInfo.isAdmin) {
      deferred.resolve();
    } else {
        storageService.logOut();
        $location.path('/');
        deferred.resolve();
    }

    return deferred.promise;
 }]
};

var resolveUser = {
  auth: ["$q", "storageService", '$location', function($q, storageService, $location) {
  var userInfo = storageService.getLoggedUser();
  var deferred = $q.defer();

    if (userInfo && !userInfo.isAdmin) {
    deferred.resolve();
    } else {
        storageService.logOut();
        $location.path('/');
        deferred.resolve();
    }

    return deferred.promise;
  }]
};

//routes configuration
app.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'views/login.html',
    controller: 'AuthCtrl'
  })
  .when('/register', {
    templateUrl: 'views/register.html',
    controller: 'AuthCtrl'
  })
  .when('/adminPanel', {
    templateUrl: 'views/adminPanel.html',
    controller: 'AdminCtrl',
    resolve: resolveAdmin
  })
  .when('/listUsers', {
    templateUrl: 'views/listUsers.html',
    controller: 'AdminCtrl',
    resolve: resolveAdmin
  })
  .when('/viewUser/:userID', {
    templateUrl: 'views/myProfile.html',
    controller: 'AdminCtrl',
    resolve: resolveAdmin
  })
  .when('/editUser', {
    templateUrl: 'views/editProfile.html',
    controller: 'AdminCtrl',
    resolve: resolveAdmin
  })
  .when('/myProfile', {
    templateUrl: 'views/myProfile.html',
    controller: 'UserCtrl',
    resolve: resolveUser
  })
  .when('/editProfile', {
    templateUrl: 'views/editProfile.html',
    controller: 'UserCtrl',
    resolve: resolveUser
  })
  .otherwise({
    redirectTo: '/'
  });

});

app.controller('AuthCtrl', ['$scope', '$location', 'storageService', AuthCtrl])
   .controller('UserCtrl', ['$scope', '$location', 'storageService', UserCtrl])
   .controller('AdminCtrl', ['$scope', '$location', 'storageService', '$routeParams', '$rootScope', AdminCtrl])
   .factory('storageService', ['adminProviderService', storageService])
   .factory('adminProviderService', adminProviderService);
