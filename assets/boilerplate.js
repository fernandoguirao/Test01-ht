(function() {
  'use strict';

  angular
    .module('app')
    .controller('facebookLoginCtrl', FacebookLoginCtrl);

  FacebookLoginCtrl.$inject = ['$scope', "$http", "$cookies", "appConfig", "topBarService"];

  function FacebookLoginCtrl($scope, $http, $cookies, appConfig, topBarService) {

    $http.get(appConfig.urlbase + '/user/unlogged')
      .success(function(data) {

        // Log
        if (appConfig.debug) {
          console.log('Success -> Login vía api');
          console.log(data);
        }
      })
      .error(function(data) {
        // Log
        if (appConfig.debug) {
          console.log('Error -> Login vía api');
          console.log(data);
        }
      });

  }

})();
