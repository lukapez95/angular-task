'use strict';

//adminProviderService function
function adminProviderService() {

  //instantiate our initial object
  var adminProviderService = function(){
    this.name = 'Admin';
    this.surname = 'Admin';
    this.email = 'admin';
    this.password = '123';
    this.isAdmin = true;
    this.id = Math.round(Math.random()*1000);
    this.dateOfLastMod = '';
  };

  //prototype function of adminProviderService that retun object admin
  adminProviderService.prototype.getAdmin = function () {
    return this;
  };

  return adminProviderService;
};
